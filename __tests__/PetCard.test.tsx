import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PetCard from '../client/components/PetCard';

const mockPet = {
  id: '1',
  name: 'Fluffy',
  age: 3,
  description: 'Fluffy kitty',
  url: 'https://example.com/fluffy.jpg',
};

describe('PetCard', () => {
  it('renders pet details correctly', () => {
    render(
      <PetCard {...mockPet} onDelete={jest.fn()} setPetData={jest.fn()} />
    );
    expect(screen.getByText('Fluffy')).toBeTruthy();
    expect(screen.getByText('Age:3')).toBeTruthy();
    expect(screen.getByText('Fluffy kitty')).toBeTruthy();
    expect(screen.getByAltText('Fluffy')).toBeTruthy();
  });

  it('enters edit mode and updates pet details', async () => {
    render(
      <PetCard {...mockPet} onDelete={jest.fn()} setPetData={jest.fn()} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Coco' },
    });
    fireEvent.change(screen.getByPlaceholderText('Age'), {
      target: { value: '4' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'Coco kitty' },
    });
    fireEvent.change(screen.getByPlaceholderText('URL'), {
      target: { value: 'https://example.com/coco.jpg' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Update' }));

    await waitFor(() => {
      expect(screen.getByText('Coco')).toBeTruthy();
      expect(screen.getByText('Age:4')).toBeTruthy();
      expect(screen.getByText('Coco kitty')).toBeTruthy();
      expect(screen.getByAltText('Coco')).toBeTruthy();
    });
  });

  it('enters edit mode and cancels editing', async () => {
    render(
      <PetCard {...mockPet} onDelete={jest.fn()} setPetData={jest.fn()} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    await waitFor(() => {
      expect(screen.getByText('Fluffy')).toBeTruthy();
      expect(screen.getByText('Age:3')).toBeTruthy();
      expect(screen.getByText('Fluffy kitty')).toBeTruthy();
      expect(screen.getByAltText('Fluffy')).toBeTruthy();
    });
  });

  it('delete a pet', async () => {
    render(
      <PetCard {...mockPet} onDelete={jest.fn()} setPetData={jest.fn()} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
  });
});
