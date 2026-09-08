const namePattern = /^[A-Za-z\s'-]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]{10}$/;
const specialCharacterPattern = /[!@#$%^&*()_\-+=?/<,>.]/;

export function validateUserDetails({ name, email, phone }) {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
        return 'Name is required';
    }

    if (trimmedName.length < 2) {
        return 'Name must be at least 2 characters';
    }

    if (trimmedName.length > 50) {
        return 'Name must not exceed 50 characters';
    }

    if (!namePattern.test(trimmedName)) {
        return 'Name can only contain letters, spaces, hyphens and apostrophes';
    }

    if (!trimmedEmail) {
        return 'Email is required';
    }

    if (!emailPattern.test(trimmedEmail)) {
        return 'Enter a valid email address';
    }

    if (!trimmedPhone) {
        return 'Phone is required';
    }

    if (!phonePattern.test(trimmedPhone)) {
        return 'Phone number must be exactly 10 digits';
    }

    return null;
}

export function validatePassword(password) {
    if (password.length < 8) {
        return 'Password must be at least 8 characters';
    }

    if (password.length > 50) {
        return 'Password must not exceed 50 characters';
    }

    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase character';
    }

    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase character';
    }

    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number';
    }

    if (!specialCharacterPattern.test(password)) {
        return 'Password must contain at least one special character';
    }

    if (/\s/.test(password)) {
        return 'Password must not contain spaces';
    }

    return null;
}
