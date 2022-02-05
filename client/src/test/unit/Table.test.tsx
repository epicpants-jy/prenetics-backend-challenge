import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import { getResultsFromAPI, resultReducer as reducer } from '../../feature/result';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { TestResultPage } from '../../component/TestResultPage';
import { ResultTableRow } from '../../component/ResultTableRow';

describe('Result Table testing', () => {

    beforeEach(() => {
        render(
            <Provider store={store}>
                <TestResultPage />
            </Provider>
        )
    });

    afterEach(cleanup);

    test('test display result correctly', async () => {
        await store.dispatch(getResultsFromAPI(1))
        expect(screen.queryByTestId('test-result-page-loading')).toBeNull();
        expect(screen.queryByTestId('test-result-page')).not.toBeNull();

        expect(screen.queryAllByTestId('test-result-data').length).toBe(store.getState().result.data.length);
    });

});