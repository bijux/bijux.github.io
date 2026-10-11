// Native speculative prefetches do not own the document's navigation or resources.
export function cancelledPrefetch(request, origin) {
  const purpose = request.headers['sec-purpose'];
  return request.failure === 'NS_BINDING_ABORTED'
    && request.resourceType === 'other'
    && request.navigation === false
    && purpose === 'prefetch'
    && URL.canParse(request.url)
    && new URL(request.url).origin === origin;
}

export function observeDiagnostics(page, origin) {
  const errors = [];
  const cancelled = [];
  const pending = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => {
    if (response.url().startsWith(origin + '/') && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  page.on('requestfailed', request => {
    if (!request.url().startsWith(origin + '/')) return;
    pending.push((async () => {
      const observation = {
        url: request.url(), failure: request.failure()?.errorText,
        resourceType: request.resourceType(), navigation: request.isNavigationRequest(),
        headers: await request.allHeaders(),
      };
      if (cancelledPrefetch(observation, origin)) cancelled.push(observation);
      else errors.push(`${observation.url}: ${observation.failure}`);
    })().catch(error => errors.push(`request diagnostics unavailable: ${error}`)));
  });
  return {
    async drain() {
      for (let index = 0; index < pending.length; index++) await pending[index];
      return { errors: [...errors], cancelled: [...cancelled] };
    },
  };
}
