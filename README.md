<div align="center">
  <h1>Moira</h1>
  
  [Spicetify](https://github.com/spicetify/spicetify-cli) theme featuring a stunning aqua glass morphism design with fluid animations and dynamic ripple effects.
  
</div>

<div align = "center">
  <h6></h6>
  <img src="https://socialify.git.ci/MobsLInep/spicetify-moira/image?language=1&name=1&owner=1&theme=Dark" alt="spicetify-moira" width="640" height="320" />
</div>

## Features

- 🎨 Beautiful aqua glass morphism design
- 💫 Dynamic fluid background animations
- 🌊 Interactive ripple effects
- 🎯 Multiple color schemes
- 🖼️ Modern and clean UI
- 🎵 Enhanced lyrics page experience

## Color Schemes

### **Base**
The default aqua theme with glass morphism effects.

![base](https://github.com/MobsLInep/spicetify-moira/blob/main/images/base.jpg?raw=true)

### **Dark**
A darker variant of the base theme.

![dark](https://github.com/MobsLInep/spicetify-moira/blob/main/images/dark.jpg?raw=true)

### **Comfy**
A comfortable, easy-on-the-eyes color scheme.

![comfy](https://github.com/MobsLInep/spicetify-moira/blob/main/images/comfy.jpg?raw=true)

### **Nord**
Inspired by the Nord color palette.

![nord](https://github.com/MobsLInep/spicetify-moira/blob/main/images/nord.jpg?raw=true)

### **Moto**
A vibrant, high-contrast color scheme.

![moto](https://github.com/MobsLInep/spicetify-moira/blob/main/images/moto.jpg?raw=true)

## Dependencies

- Latest version of [Spicetify](https://github.com/spicetify/spicetify-cli)
- Latest version of [Spotify](https://www.spotify.com/download)
- Hardware acceleration enabled in Spotify settings

## Installation

### Manual Installation

1. Download this repo as an archive
2. Navigate to the Spicetify's `Themes` directory using `spicetify path userdata`
3. Create a new folder called `Moira`
4. Copy all files from the downloaded repo to the `Moira` folder
5. Run the following commands:

```shell
spicetify config current_theme Moira color_scheme base
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify apply
```

## Customization

### Color Scheme

The `base` color scheme is applied by default. Available color schemes are: `base`, `dark`, `comfy`, `nord`, `moto`

To change the color scheme:

```shell
spicetify config color_scheme <color_scheme>
spicetify apply
```

### Custom Colors

1. Navigate to the Spicetify's `Themes` directory
2. Open the `Moira` folder
3. Edit your current color scheme in the `color.ini` file
4. Run `spicetify apply`

## Troubleshooting

### No Blur Effects
Make sure hardware acceleration is enabled in Spotify settings:
1. Open Spotify
2. Go to Settings
3. Enable "Hardware Acceleration"

### Theme Not Working
If you experience any issues:
1. Make sure you have the latest version of Spicetify and Spotify
2. Try running `spicetify restore` followed by `spicetify apply`
3. Check if hardware acceleration is enabled

## Features in Detail

### Glass Morphism
- Beautiful frosted glass effect on main components
- Dynamic backdrop filters
- Subtle border highlights

### Fluid Animations
- Smooth particle system
- Dynamic background gradients
- Interactive ripple effects on interaction

### Enhanced Lyrics
- Special styling for the lyrics page
- Animated text effects
- Improved readability and aesthetics

## Credits

- Inspired by modern glass morphism design trends
- Built with love for the Spicetify community

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Create new color schemes

## Support

If you enjoy this theme, please:
- Star the repository
- Share it with others
- Report any issues you encounter
- Suggest improvements

**Thank you for using Moira!** 
