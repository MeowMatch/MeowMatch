import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import PetCardHolder from '../client/components/PetCardHolder';

// Import jest-fetch-mock at the top of your test file
import fetchMock from 'jest-fetch-mock';

// Configure jest-fetch-mock
fetchMock.enableMocks();

const mockPetData = [
  {
    _id: '1',
    name: 'Fluffy',
    age: 3,
    description: 'Fluffy kitty',
    url: 'https://example.com/fluffy.jpg',
  },
];

describe('PetCardHolder', () => {
  beforeEach(() => {
    // Clear fetch mocks before each test
    fetchMock.resetMocks();
  });

  it('renders pet cards correctly', async () => {
    render(<PetCardHolder petData={mockPetData} setPetData={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByText('Fluffy')).toBeTruthy();
    });
  });

  it('delete a pet and updates the card holder', async () => {
    // Mock the fetch call for the delete operation
    fetchMock.mockResponseOnce(JSON.stringify({}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    const setPetDataMock = jest.fn();
    render(<PetCardHolder petData={mockPetData} setPetData={setPetDataMock} />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    // await waitFor(() => {
    //   expect(screen.queryByText('Fluffy')).toBeFalsy();
    // });

    await waitFor(() => {
      // Ensure that the delete operation was called with the correct URL and method
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3000/pets/1',
        {
          method: 'DELETE',
        }
      );

      // Expect that the pet card with the name 'Fluffy' is not present in the DOM
      expect(screen.queryByText('Fluffy')).toBeFalsy();
    });
  });
});
