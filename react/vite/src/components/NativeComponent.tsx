import { HypeLabContext, Environment, HypeLab, useNative } from 'hypelab-react';
import { useState } from 'react';

const client = new HypeLab({
  URL: 'https://api.hypelab-staging.com',
  propertySlug: '3eb413c650', // gallery
  environment: Environment.Development,
});

function NativeComponent() {
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
            <a data-cy="ctaLink" href="/" ref={ad.ctaUrl} target="_blank" rel="noreferrer">
              {ad.metadata && ad.metadata.creative_set_type === 'image' ? (
                <img data-cy="image" className="image" ref={ad.image} alt="hypelab_image" />
              ) : null}
              {ad.metadata && ad.metadata.creative_set_type === 'video' ? (
                <video data-cy="video" className="video" ref={ad.video}></video>
              ) : null}
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
