import MenuCarousel from "../menuCarousel/MenuCarousel";

const Menu = () => {
  return (
    <div className="bg-primary-orange-bg grid grid-cols-2 p-10 gap-10">
      <div className="flex flex-col justify-center gap-6 pr-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-bold text-gray-800 animate-fade-in-up">
            Discover Amazing
          </h1>
          <h1 className="text-6xl font-bold animate-fade-in-up">
            <span className="text-primary-orange bg-gradient-to-r from-primary-orange to-primary-orange-hover bg-clip-text text-transparent mr-2">
              Recipes
            </span>
            <svg
              className="w-14 h-14 inline-block fill-primary-orange animate-bounce-horizontal transition-transform duration-300"
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="currentColor"
            >
              <path d="M673-446.67H160v-66.66h513l-240-240L480-800l320 320-320 320-47-46.67 240-240Z" />
            </svg>
          </h1>
        </div>

        <p className="text-gray-600 text-lg leading-8 animate-fade-in-up delay-200">
          Explore our curated collection of delicious recipes from talented home
          cooks around the world
        </p>
      </div>

      <MenuCarousel totalCards={5} cardWidth={320} />
    </div>
  );
};

export default Menu;
