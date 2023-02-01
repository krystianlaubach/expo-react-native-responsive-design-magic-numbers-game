class RandomNumberGenerator {
    /**
     * @public
     *
     * @param {number} min
     * @param {number} max
     * @param {number} exclude
     *
     * @returns {number}
     */
    public static generateRandomBetween(min: number, max: number, exclude: number): number {
        const randomNumber: number = Math.floor(Math.random() * (max - min)) + min;

        return randomNumber === exclude
            ? this.generateRandomBetween(min, max, exclude)
            : randomNumber;
    }
}

export default RandomNumberGenerator;
