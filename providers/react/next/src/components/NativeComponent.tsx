import { HypeLabContext, Environment, HypeLab, useNative } from 'hypelab-react';
import { useEffect, useState } from 'react';

const client = new HypeLab({
  URL: 'https://api.hypelab-staging.com',
  propertySlug: '3eb413c650', // gallery
  environment: Environment.Development,
});

function NativeComponent() {
  useEffect(() => {
    client.identity.setWalletAddresses(['0x123']);
  }, [client]);

  function Native() {
    let ad = useNative({ placement: '5d788944b1' });

    return (
      <div className="bg-black p-5">
        <div className="relative flex items-center">
          <div className="flex-shrink-0">
            <img data-cy="icon" className="h-10 w-10 rounded-full mr-5" ref={ad.icon} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="font-medium text-slate-400">
              @<span data-cy="advertiser" ref={ad.advertiser}></span>
            </p>
            <p data-cy="displayUrl" className="text-emerald-300 text-sm" ref={ad.displayUrl}></p>
          </div>
        </div>
        <div className="body-row text-left">
          <div data-cy="headline" className="mt-3 text-white" ref={ad.headline}></div>

          <div data-cy="body" className="mt-3 text-white" ref={ad.body}></div>

          <div className="mt-5">
            <a data-cy="ctaLink" href="/" ref={ad.ctaLink} target="_blank" rel="noreferrer">
              <div data-cy="mediaContent" className="mediaContent" ref={ad.mediaContent} />
              <div
                data-cy="ctaText"
                className="rounded-full bg-emerald-300 px-10 py-2 text-black font-bold mt-5 text-center"
                ref={ad.ctaText}
              ></div>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <HypeLabContext client={client}>
      <Native />
    </HypeLabContext>
  );
}

export { NativeComponent };
