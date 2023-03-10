export const validateEmail = (email: string) => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
};

export const removeWhitespace = (text: string) => {
    const regex = /\s/g;
    return text.replace(regex, "");
};
