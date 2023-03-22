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
  }, []);

  function Native() {
    let ad = useNative({ placement: '5d788944b1' });

    return (
      <div className="bg-black p-5">
        <div className="relative flex items-center">
          <div className="flex-shrink-0">
            <img data-cy="icon" className="mr-5 h-10 w-10 rounded-full" ref={ad.icon} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="font-medium text-slate-400">
              @<span data-cy="advertiser" ref={ad.advertiser}></span>
            </p>
            <p data-cy="displayUrl" className="text-sm text-emerald-300" ref={ad.displayUrl}></p>
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
                className="mt-5 rounded-full bg-emerald-300 px-10 py-2 text-center font-bold text-black"
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
