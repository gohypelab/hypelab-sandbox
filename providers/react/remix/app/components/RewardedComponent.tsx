import { Rewarded, HypeLabContext, Environment, HypeLab } from 'hypelab-react';
import { useEffect, useState } from 'react';

const client = new HypeLab({
  URL: 'https://api.hypelab-staging.com',
  propertySlug: '3eb413c650', // gallery
  environment: Environment.Development,
});

function RewardedComponent() {
  useEffect(() => {
    client.identity.setWalletAddresses(['0x123']);
  }, []);

  const [show, setShow] = useState<boolean>(false);

  const handleWatch = async function () {
    setShow(true);
  };

  const handleRewarded = function () {
    // Grant a reward (e.g., Give an in-game item, unlock a paywall, etc.)
    console.log('handleRewarded called');
    setShow(false);

    // Should load another ad here.
  };

  return (
    <HypeLabContext client={client}>
      <div>
        <button
          className="rounded-md border border-gray-300 bg-indigo-600 px-4 py-2 text-lg text-white"
          onClick={handleWatch}
          data-cy="button"
        >
          Watch Video
        </button>
      </div>
      <Rewarded placement="f31318b055" show={show} onComplete={handleRewarded} />
    </HypeLabContext>
  );
}

export { RewardedComponent };
