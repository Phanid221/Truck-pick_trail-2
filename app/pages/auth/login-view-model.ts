import { Observable } from '@nativescript/core';
import { firebase } from '@nativescript/firebase-core';
import { Auth, GoogleAuthProvider } from '@nativescript/firebase-auth';

export class LoginViewModel extends Observable {
    private _email: string = '';
    private _password: string = '';
    private _loginType: number = 0; // 0 for User, 1 for Broker
    private auth: Auth;

    constructor() {
        super();
        this.auth = firebase().auth();
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notifyPropertyChange('email', value);
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    get loginType(): number {
        return this._loginType;
    }

    set loginType(value: number) {
        if (this._loginType !== value) {
            this._loginType = value;
            this.notifyPropertyChange('loginType', value);
        }
    }

    async onLogin() {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(
                this.email,
                this.password
            );
            console.log('User logged in:', userCredential.user.uid);
            
            // Use the Frame module directly
            const frame = require('@nativescript/core').Frame;
            const targetPage = this.loginType === 0 ? 
                './pages/user/user-dashboard' : 
                './pages/broker/broker-dashboard';
            
            frame.topmost().navigate({
                moduleName: targetPage,
                clearHistory: true,
                transition: {
                    name: 'fade'
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            // Show error dialog or message
            const alert = require('@nativescript/core').alert;
            alert({
                title: 'Login Failed',
                message: 'Please check your credentials and try again.',
                okButtonText: 'OK'
            });
        }
    }

    async onGoogleLogin() {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await this.auth.signInWithProvider(provider);
            console.log('Google login successful:', userCredential.user.uid);
            this.navigateToHome();
        } catch (error) {
            console.error('Google login error:', error);
            const alert = require('@nativescript/core').alert;
            alert({
                title: 'Google Login Failed',
                message: 'Please try again later.',
                okButtonText: 'OK'
            });
        }
    }

    async onSignUp() {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(
                this.email,
                this.password
            );
            console.log('User created:', userCredential.user.uid);
            this.navigateToHome();
        } catch (error) {
            console.error('Sign up error:', error);
            const alert = require('@nativescript/core').alert;
            alert({
                title: 'Sign Up Failed',
                message: 'Please try again with a different email.',
                okButtonText: 'OK'
            });
        }
    }

    private navigateToHome() {
        const frame = require('@nativescript/core').Frame;
        const targetPage = this.loginType === 0 ? 
            './pages/user/user-dashboard' : 
            './pages/broker/broker-dashboard';
        
        frame.topmost().navigate({
            moduleName: targetPage,
            clearHistory: true,
            transition: {
                name: 'fade'
            }
        });
    }
}