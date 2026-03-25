import { createFileRoute } from '@tanstack/react-router';
import { ItemDetails } from '../../../pages/itemDetails/index.jsx';

export const Route = createFileRoute('/_layout/itemDetails/$name')({
    component: ItemDetails,
});