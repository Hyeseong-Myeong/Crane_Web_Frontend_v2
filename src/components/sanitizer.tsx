import DOMPurify from 'dompurify';

const sanitizeWithLimitedStyle = (content: string): string => {
    const allowedStyles: Array<string> = ['color', 'font-size'];

    const sanitizedHtml = content.replace(/style="([^"]*)"/g, (_match, styleValue) => {
        const filteredStyles = styleValue
            .split(';')
            .filter((style: string) => {
                return allowedStyles.some((allowed: string) => style.trim().startsWith(allowed + ':'));
            })
            .join(';');

        return filteredStyles ? `style="${filteredStyles}"` : '';
    });

    return DOMPurify.sanitize(sanitizedHtml, {
        ALLOWED_TAGS: ['span', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'u', 's'],
        ALLOWED_ATTR: ['class', 'style'],
    });
};

export default sanitizeWithLimitedStyle;