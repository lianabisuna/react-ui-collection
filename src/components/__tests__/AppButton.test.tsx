import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { AppButton } from '../app';

describe('AppButton', async () => {
	// Resets all renders after each test
	afterEach(() => {
		cleanup();
	});

	it('renders button element', async () => {
		await render(<AppButton></AppButton>);

		const button = await screen.findByRole('button');

		expect(button).toBeInTheDocument();
	});

	// it("renders correct button type", () => {
	// 	expect(false).toBeTruthy();
	// });

	it("renders button element in disabled state", async () => {
		const mockFunction = vi.fn();
		await render(<AppButton disabled></AppButton>);

		const button = await screen.findByRole('button');

		// Passes if "disabled" attribute exists?
		expect(button).toBeDisabled();

		// Passes if not clickable
		fireEvent.click(button);
		expect(mockFunction).not.toHaveBeenCalled();

		// Passes if button has disabled classes
		const classList = ['opacity-50', 'pointer-events-none'];
		classList.forEach(className => {
			expect(button).toHaveClass(className);
		});
	});

	it('displays button text', async () => {
		await render(<AppButton>Submit</AppButton>);

		const buttonText = await screen.queryByText('Submit');

		expect(buttonText).toBeInTheDocument();
	});
	
	it("triggers click event ", async () => {
		const mockFunction = vi.fn();
		await render(<AppButton onClick={mockFunction}></AppButton>);

		const button = await screen.findByRole('button');

		fireEvent.click(button);
		expect(mockFunction).toHaveBeenCalled();
	});

	// it("renders as a router-link", () => {
	// 	expect(false).toBeTruthy();
	// });

	// it("renders as an acnhor element", () => {
	// 	expect(false).toBeTruthy();
	// });
});