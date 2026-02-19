import * as Keychain from 'react-native-keychain'

export const setTokens = async (accessToken: string, refreshToken: string) => {

    try {
        const tokens: any = JSON.stringify({ accessToken, refreshToken })
        await Keychain.setGenericPassword('user_tokens', tokens);

    } catch (error) {
        console.log(error);
    }
};

export const getTokens = async () => {

    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            return JSON.parse(credentials.password)
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const clearTokens = async () => {
    try {
        await Keychain.resetGenericPassword();
    } catch (error) {
        console.log(error);
    }
}