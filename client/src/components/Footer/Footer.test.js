import { render, screen } from '@testing-library/react';
import {Footer} from './Footer';


describe('Footer', () => {
 it('renders appropriately and have the text "Created By" and link with the text "Alejandro Galus"', () => {
   render(<Footer />)
   expect(screen.getByText(/Created by/i)).toBeInTheDocument()
   const linkElement = screen.getByText(/Alejandro Galus/i);
   expect(linkElement).toBeInTheDocument();
 })
})