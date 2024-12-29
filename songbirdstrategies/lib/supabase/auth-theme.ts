import { ThemeSupa } from "@supabase/auth-ui-shared";

export const authTheme = {
  ...ThemeSupa,
  default: {
    colors: {
      brand: 'hsl(var(--primary))',
      brandAccent: 'hsl(var(--primary))',
      brandButtonText: 'white',
      defaultButtonBackground: 'transparent',
      defaultButtonBackgroundHover: '#2d2d2d',
      defaultButtonBorder: 'gray',
      defaultButtonText: 'white',
      dividerBackground: '#2d2d2d',
      inputBackground: 'transparent',
      inputBorder: 'gray',
      inputBorderHover: 'white',
      inputBorderFocus: 'hsl(var(--primary))',
      inputText: 'white',
      inputPlaceholder: 'darkgray',
    },
    space: {
      spaceSmall: '4px',
      spaceMedium: '8px',
      spaceLarge: '16px',
    },
    fonts: {
      bodyFontFamily: `var(--font-sans)`,
      buttonFontFamily: `var(--font-sans)`,
      inputFontFamily: `var(--font-sans)`,
      labelFontFamily: `var(--font-sans)`,
    },
    fontSizes: {
      baseBodySize: '14px',
      baseInputSize: '16px',
      baseLabelSize: '14px',
      baseButtonSize: '14px',
    },
    borderWidths: {
      buttonBorderWidth: '1px',
      inputBorderWidth: '1px',
    },
    radii: {
      borderRadiusButton: '6px',
      buttonBorderRadius: '6px',
      inputBorderRadius: '6px',
    },
  },
} as const;