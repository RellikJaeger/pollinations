import React from 'react';
import PropTypes from 'prop-types';
import usePollinationsImage from '../hooks/usePollinationsImage';

/**
 * PollinationsImage Component
 * 
 * This component generates and displays an image using the Pollinations API based on the given prompt and options.
 * The image can optionally be wrapped in a link to its source.
 *
 * @component
 * 
 * @param {Object} props - The component props
 * @param {string} [props.prompt] - The text prompt used to generate the image. If not provided, `children` (if it's a string) will be used as the prompt.
 * @param {number} [props.width=768] - The width of the generated image in pixels.
 * @param {number} [props.height=768] - The height of the generated image in pixels.
 * @param {number} [props.seed=-1] - The seed for random image generation. Use -1 for a random seed.
 * @param {Object} [props.options] - Additional options for image generation.
 * @param {string} [props.options.model='turbo'] - The AI model to use for image generation (e.g., 'turbo', 'flux', 'flux-realism').
 * @param {boolean} [props.options.nologo=true] - If true, generates the image without a logo.
 * @param {boolean} [props.options.enhance=false] - If true, applies enhancement to the generated image.
 * @param {string} [props.alt] - The alt text for the image. If not provided, the prompt will be used.
 * @param {boolean} [props.isLink=false] - If true, wraps the image in a link to its source URL.
 * @param {React.ReactNode} [props.children] - Child elements. If a string, it's used as the prompt when no prompt prop is provided.
 * @param {Object} [props...] - Any additional props will be spread onto the img element.
 * 
 * @returns {JSX.Element} The rendered PollinationsImage component
 * 
 * @example
 * // Basic usage
 * <PollinationsImage prompt="A beautiful sunset over the ocean" width={1024} height={768} />
 * 
 * @example
 * // Using children as prompt and making it a clickable link
 * <PollinationsImage width={500} height={500} isLink={true}>
 *   A futuristic cityscape
 * </PollinationsImage>
 * 
 * @example
 * // Using additional options
 * <PollinationsImage 
 *   prompt="An abstract painting" 
 *   width={800} 
 *   height={600} 
 *   options={{ model: 'flux-realism', enhance: true }}
 *   alt="Abstract art generated by AI"
 * />
 */
const PollinationsImage = ({
    prompt,
    width = 768,
    height = 768,
    seed = -1,
    options = {},
    alt,
    isLink = false,
    children,
    ...props
}) => {
    // Use prompt if provided, otherwise use children if it's a string
    const finalPrompt = prompt || (typeof children === 'string' ? children : '');

    // Generate the image URL using the usePollinationsImage hook
    const imageUrl = usePollinationsImage(finalPrompt, { ...options, width, height, seed });

    // Create the image element
    const imgElement = (
        <img
            src={imageUrl}
            alt={alt || finalPrompt}
            width={width}
            height={height}
            {...props}
        />
    );

    // Wrap in a link if isLink is true, otherwise return the image element
    return isLink ? (
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imgElement}
        </a>
    ) : imgElement;
};

PollinationsImage.propTypes = {
    prompt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    seed: PropTypes.number,
    options: PropTypes.shape({
        model: PropTypes.string,
        nologo: PropTypes.bool,
        enhance: PropTypes.bool,
    }),
    alt: PropTypes.string,
    isLink: PropTypes.bool,
    children: PropTypes.node,
};

export default PollinationsImage;