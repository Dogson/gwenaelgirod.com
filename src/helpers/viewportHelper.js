export function isInViewport(ref, offset = 0) {
    if (!ref || !ref.current) return false;
    const top = ref.current.getBoundingClientRect().top;
    return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
}