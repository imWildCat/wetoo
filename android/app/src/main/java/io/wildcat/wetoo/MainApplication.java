package io.wildcat.wetoo;

import android.app.Application;
import android.util.Log;

import com.avos.avoscloud.AVOSCloud;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.microsoft.codepush.react.CodePush;
import com.oblador.vectoricons.VectorIconsPackage;
import com.psykar.cookiemanager.CookieManagerPackage;

import io.wildcat.wetoo.BuildConfig;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    @Override
    public void onCreate() {
        super.onCreate();

        AVOSCloud.initialize(this,"FBrnCyfhKAFtrQWplRNEkUKq-gzGzoHsz","xcwarpwn1iB2z7EqoKFwMrfr");
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG),
                    new VectorIconsPackage(),
                    new CookieManagerPackage()
                    );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
