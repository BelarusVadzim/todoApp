import { todoReducer as todo } from '../slices';
import { applicationReducer as application } from '../slices';

const rootReducer = { todo, application };

export default rootReducer;
