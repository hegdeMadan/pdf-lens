export const colors = {
  colorCodes: [
    '#3ff1b5',
    '#ff61b5',
    '#fe6115',
    '#26961e',
    '#a9bc2f',
    '#1976d2',
    '#00e9fc',
    '#fce705',
    '#eeeeee',
    '#f00efe',
    '#ff0fd0',
    '#32a852',
    '#bd943a',
    '#e3da66',
    '#e6b5c3',
  ],
  primry: '#3698f7',
  grey: {
    light: '#f7f7f7',
    lightPlus: '#fafafa',
    medium: '#eee',
    dark: '#555',
    darkPlus: '#4a4a4a',
    superDark: '#1a1a1a',
    labelGrey: '#969696'
  },
  black: '#000',
  title: '#1a1a1a',
  white: '#fff',
  blue: '#3f51b5',
  statusBar: '#fff',
  card: '#fff',
  blackOverlay: 'rgba(0, 0, 0, 0.9)',
  tabIconFocused: '#1976d2',
  tabIcon: '#555',
  red: '#ff0000',
  avatar: '#2e8ff0',
  hover: {
    primary: '#def7ff'
  }
}

export const borders = {
  borderWidth: {
    inputText: 2,
    bottomBar: 1,
  },

  borderColor: {
    inputText: colors.grey.light,
    bottomBar: colors.grey.light,
    tabIcon: colors.grey.medium,
  },

  borderRadius: {
    default: 7,
    inputText: 7,
    card: 10,
    sideImage: 5,
    search: 15,
    circle: 100,
  },
}

export const spaces = {
  margin: {
    container: 10,
    signinForm: {
      labelAndInputSpacing: 10,
      formContainer: 50,
    },
    sideImageCardTitle: 10,
    horizontalCard: 10,
    storyContainer: 20,
    storyImage: 10,
    label: 12,
  },

  padding: {
    signinForm: {
      placeholder: {
        horizontal: 12,
        vertical: 5,
      },
      labelLeft: 2,
    },
    search: {
      placeholder: {
        horizontal: 10,
        vertical: 0,
      },
      labelLeft: 2,
    },
    label: 12,
  },
  statusLabel: 4
}

export const sizes = {
  tabBar: 52,
  height: {
    contactList: 68,
    inputText: 50,
    breaker: 30,
    button: {
      default: 50,
    },
    card: 120,
    sideImageCard: 75,
    search: 40,
    topNav: 40,
    header: 50,
    bottomBar: 40,
    avatar: 60
  },

  width: {
    inputText: '100%', // prefer local style instead
    breaker: 15,
    header: 50,
    avatar: 60
  },

  tabIcon: 20,
  scanIcon: 24,
  miscIcons: 28,
  label: 14,
  smallLabel: 11,
  mediumLabel: 13,
  buttonText: 16,
  headerText: 20,
  letterSpacing: {
    button: 0.2,
  },
  heading: 22,
  subHeading: 20,
  heading2: 18,
  heading3: 15,
  paragraph: 18,
  firstLetter: 24,
  bottomBarIcon: 24,
  paragraphLineHeight: 34, // fontsize(firstLetter) + 10
}

export const textColors = {
  heading: colors.black,
  paragraph: colors.grey.superDark,
  label: colors.black,
  smallLabel: colors.grey.dark,
  mediumLabel: colors.grey.darkPlus,
  button: colors.white,
  note: colors.blue,
  onImageTitle: colors.white,
  smallCardTitle: colors.title,
}

export const buttonColor = {
  default: colors.black,
}
