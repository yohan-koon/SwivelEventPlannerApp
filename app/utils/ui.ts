import { Dimensions } from 'react-native';

const DESIGN_SCREEN_WIDTH = 375;
const DESIGN_SCREEN_HEIGHT = 854;

const { width, height } = Dimensions.get('window');

/**
 * Calculate width based on design screen width
 * @param size size of width
 * @returns width
 */
const s = size => width / DESIGN_SCREEN_WIDTH * size;

/**
 * Calculate height based on design screen height
 * @param size size of height
 * @returns height
 */
const vs = size => height / DESIGN_SCREEN_HEIGHT * size;

/**
 * Calculate size based on design screen size
 * @param size size of height
 * @param factor factor of size
 * @returns size
 */
const ms = (size, factor = 0.5) => size + ( s(size) - size ) * factor;


export { vs, ms };
