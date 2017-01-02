
Wetoo
===

An unofficial iOS/Android client for [V2EX](https://v2ex.com), implemented by [React Native](https://github.com/facebook/react-native).

Feel free to open an issue if you have any question. But it is strongly recommended:

- Use English if you can.
- Talk on social media (shown in the following) if your question is not relevant to this project:
  - Twitter: [https://twitter.com/WildCat_io](https://twitter.com/WildCat_io)
  - Weibo: [http://weibo.com/wildcat92](http://weibo.com/wildcat92 )

## Downloads

- Android: It is available on [Google Play](https://play.google.com/store/apps/details?id=io.wildcat.wetoo) and [Coolapk](http://www.coolapk.com/apk/io.wildcat.wetoo). In addition, you can also download it from [releases](https://github.com/imWildCat/wetoo-react-native/releases).
- iOS: It is available on [App Store](https://itunes.apple.com/cn/app/wetoo-v2ex-di-san-fang-kai/id1122433099).

## Roadmap

- [x] View topics
- [x] Log in / log out
- [x] Reply topics
- [x] View nodes
- [x] Search for nodes
- [x] Create new topics
- [x] View users
- [x] View topics of users
- [ ] View replies of users
- [ ] Daily mission
- [ ] Full-text search
- [ ] Add images while creating topics or replies
- [ ] Show favorite counts or appreciation counts for topics and replies
- [ ] Implement global store by [Mobx](https://github.com/mobxjs/mobx)


## Releases

This project will be always released by App Store and Google Play (in the future). However, hot fixes will be released by [Code Push](http://microsoft.github.io/code-push/) and updated while starting or resuming the app.

`Makefile` contains some commands to release hot fixes:

- `make cpas des="[RELEASE NOTES]"` : Make mandatory staging hot fix for Android.
- `make cpasm des="[RELEASE NOTES]"` : Make mandatory staging hot fix for Android.
- `make cpap des="[RELEASE NOTES]"` : Make production hot fix for Android.
- `make cpapm des="[RELEASE NOTES]"` : Make mandatory production hot fix for Android.
- `make cpis des="[RELEASE NOTES]"` : Make staging hot fix for iOS.
- `make cpism des="[RELEASE NOTES]"` : Make mandatory staging hot fix for iOS. 
- `make cpip des="[RELEASE NOTES]"` : Make production hot fix for iOS.
- `make cpipm des="[RELEASE NOTES]"` : Make mandatory production hot fix for iOS.

Note: **The Code Push app is currently managed by the maintainer. If you would like to test it, please login and add your own deployment keys.**


## Known issues

- Cannot report topics on Android (not implemented yet)
- Some animations break on Android
- Keyboard will not hide while scrolling on topic page
- Some TextInputs on Android is not displayed correctly

## Contributing

You must fork this project and commit to your branch which is named by your feature. Before starting, you'd better discuss your work on [issues](https://github.com/imWildCat/wetoo-react-native/issues/new) .

Your code style mush satisfy `.eslintrc` of this project. But you could also open an issue to discuss changing it.

## Licenses & Credits

- Codes: the MIT license.
- UI Design: All the UI design should only be used in this project (Wetoo) or otherwise get the permission of the project maintainer ([@imWildCat](https://github.com/imWildCat)).
- App Icon Design: [Creative Commons 4.0](https://creativecommons.org/licenses/by/4.0/) , created by [Sheep](http://sheephe.com) .
- Splash Screen Photo: [do whatever you want](https://unsplash.com/license) , shot by [Luca Baggio](https://unsplash.com/photos/ET244M6ZMN4) (Italy), from Unsplash.

