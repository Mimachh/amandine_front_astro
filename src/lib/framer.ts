export const toggleMenuNavButton = (rotateDirection: number, yDirection: number, xDirection: number = 0) => {
    return {
        closed: { rotate: 0, y: 0 },
        open: {
            rotate: rotateDirection,
            y: yDirection,
            x: xDirection,
        },
    };
};