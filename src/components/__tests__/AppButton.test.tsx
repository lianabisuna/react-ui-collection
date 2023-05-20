// Imports
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

// To Test
import { AppButton } from '../app';

// Tests
describe('AppButton', async () => {
    /**
     * Resets all renders after each test
     */
    afterEach(() => {
        cleanup();
    });

    /**
     * Passes - renders button
     */
    it('renders button element', async () => {
        // Setup
        await render(<AppButton></AppButton>);

        const button = await screen.findByRole('button')

        // Post Expectations
        expect(button).toBeInTheDocument();
    });

    /**
     * Passes - displays button text
     */
    it('displays button text', async () => {
        // Setup
        await render(<AppButton>Submit</AppButton>);

        const buttonText = await screen.queryByText('Submit')

        // Post Expectations
        expect(buttonText).toBeInTheDocument();
    });
});