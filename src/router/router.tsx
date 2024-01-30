import { Navigate, Route, Routes } from 'react-router-dom';
import { CatsFavoritePage } from '~/pages/CatsFavoritePage';
import { CatsPage } from '~/pages/CatsPage';
import { ROUTES } from '~/router/routePaths';

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTES.CATS} element={<CatsPage />} />
        <Route path={ROUTES.CATS_FAVORITE} element={<CatsFavoritePage />} />
        <Route
          path={'*'}
          element={<Navigate to={ROUTES.CATS} replace={true} />}
        />
      </Routes>
    </>
  );
};
