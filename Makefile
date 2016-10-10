ar: 
	cd android;\
	./gradlew assembleRelease;\
	open ./app/build/outputs/apk

cpas:
	code-push release-react Wetoo-Android android --des "${des}"

cpasm:
	code-push release-react Wetoo-Android android -m --des "${des}"

cpap:
	code-push release-react Wetoo-Android android -d Production --des "${des}"

cpapm:
	code-push release-react Wetoo-Android android -m -d Production --des "${des}"

cpis:
	code-push release-react Wetoo-iOS ios --des "${des}"

cpism:
	code-push release-react Wetoo-iOS ios -m --des "${des}"

cpip:
	code-push release-react Wetoo-iOS ios -d Production --des "${des}"

cpipm:
	code-push release-react Wetoo-iOS ios -m -d Production --des "${des}"
