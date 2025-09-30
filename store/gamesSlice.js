import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch games from JSON Server
export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async () => {
    const response = await axios.get('http://localhost:5000/games');
    return response.data;
  }
);

// Async thunk to add new game to JSON Server
export const addGameToServer = createAsyncThunk(
  'games/addGameToServer',
  async (gameData) => {
    const response = await axios.post('http://localhost:5000/games', gameData);
    return response.data;
  }
);

// Async thunk to remove game from JSON Server
export const removeGameFromServer = createAsyncThunk(
  'games/removeGameFromServer',
  async (gameId) => {
    await axios.delete(`http://localhost:5000/games/${gameId}`);
    return gameId;
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [],
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const game = action.payload;
      const existingItem = state.cart.find(item => item.id === game.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...game, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const gameId = action.payload;
      state.cart = state.cart.filter(item => item.id !== gameId);
    },
    updateCartQuantity: (state, action) => {
      const { gameId, quantity } = action.payload;
      const item = state.cart.find(item => item.id === gameId);
      if (item) {
        if (quantity <= 0) {
          state.cart = state.cart.filter(item => item.id !== gameId);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch games
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add game to server
      .addCase(addGameToServer.fulfilled, (state, action) => {
        state.games.push(action.payload);
      })
      // Remove game from server
      .addCase(removeGameFromServer.fulfilled, (state, action) => {
        state.games = state.games.filter(game => game.id !== action.payload);
        // Also remove from cart if it exists there
        state.cart = state.cart.filter(item => item.id !== action.payload);
      });
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = gamesSlice.actions;
export default gamesSlice.reducer;
