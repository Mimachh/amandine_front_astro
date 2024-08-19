// Instructions for integrating continuous logo animation in Tailwind CSS:
// Add the following configurations to the `extend` section of your `tailwind.config.js`:
// 1. Keyframes for 'logo-cloud' animation that continuously moves logos from right to left:
//    keyframes: {
//      'logo-cloud': {
//        from: { transform: 'translateX(0)' },
//        to: { transform: 'translateX(calc(-100% - 4rem))' },
//      },
//    }
// 2. Animation utility to apply this keyframe:
//    animation: {
//      'logo-cloud': 'logo-cloud 30s linear infinite', // Adjust duration and timing as needed for your design.
//    }

const logos = [
  {
    name: "Bleu Libellule",
    url: "https://medias.bleulibellule.com/themes/blue/src/img/logo/logo.svg",
  },
  {
    name: "Ongle 24",
    url: "https://ongle24.com/cdn/shop/files/logo-ongle24-black-512_1e04fdcd-71b7-4187-b4fb-ae4e34d23551.webp?v=1703085040&width=260",
  },
  {
    name: "Peggy Sage",
    url: "https://www.peggysage.com/media/logo/default/logo-peggy-sage.svg",
  },
  {
    name: "Pro Duo",
    url: "https://www.pro-duo.fr/on/demandware.static/-/Sites-ProDuo_Trade_FR-Library/default/dw796a04eb/homepage/produo-logo.svg",
  },
];

const ScrollLogo = () => {
  return (
    <div className="w-full py-12 ">
      <div className="flex w-full flex-col items-center justify-center px-4 md:px-8">
        <div className="font-medium uppercase">Les marques avec qui je travaille</div>
        <div className="mx-auto w-full px-4 md:px-8">
          <div
            className="group relative mt-6 flex gap-6 overflow-hidden p-2"
            style={{
              maskImage:
                "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
            }}
          >
            {Array(5)
              .fill(null)
              .map((index) => (
                <div
                  key={index}
                  className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
                >
                  {logos.map((logo, key) => (
                    <img
                      key={key}
                      src={logo.url}
                      className="h-10 w-28 px-2 brightness-0 dark:invert"
                      alt={`${logo.name}`}
                    />
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollLogo;
