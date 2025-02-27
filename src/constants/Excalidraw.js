import dynamic from "next/dynamic";

const MenuHint = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => {
    return mod.WelcomeScreen.Hints.MenuHint;
  })
);

const Help = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => {
    return mod.WelcomeScreen.Hints.HelpHint;
  })
);

const Heading = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => {
    return mod.WelcomeScreen.Center.Heading;
  })
);

const CenterLogo = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => {
    return mod.WelcomeScreen.Center.Logo;
  })
);

const MenuItemLink = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => {
    return mod.WelcomeScreen.Center.MenuItemLink;
  })
);

const Center = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => {
    return mod.WelcomeScreen.Center;
  })
);

const CenterDropDownMenu = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => {
    return mod.WelcomeScreen.Center.Menu;
  })
);
const WelcomeScreen = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => {
    return mod.WelcomeScreen;
  })
);

const Hint = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => {
    return mod.WelcomeScreen.Hints.ToolbarHint;
  })
);
const Excalidraw = dynamic(() =>
  import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw)
);

const MainMenu = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.MainMenu),
  { ssr: false }
);
const MainMenuGroup = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.MainMenu.Group),
  { ssr: false }
);
const MainMenuItem = dynamic(
  () => import("@excalidraw/excalidraw").then((mod) => mod.MainMenu.Item),
  { ssr: false }
);
const MainMenuDefaultItems = dynamic(
  () =>
    import("@excalidraw/excalidraw").then((mod) => mod.MainMenu.DefaultItems),
  { ssr: false }
);

export {
  Excalidraw,
  MenuHint,
  Help,
  Heading,
  CenterLogo,
  Center,
  CenterDropDownMenu,
  WelcomeScreen,
  MenuItemLink,
  Hint,
  MainMenu,
  MainMenuGroup,
  MainMenuItem,
  MainMenuDefaultItems,
};
