import  { createStackNavigator, createAppContainer } from 'react-navigation';

import Main from './pages/main'
import Product from './pages/product'

const Routes = createStackNavigator(
    {
        Main,
        Product
    },
    {
        defaultNavigationOptions: {
            title: 'Default Header',
            headerStyle: {
                backgroundColor: "#000"
            },
            headerTintColor: "#FFF"
        }
    }
);

const RoutesContainer = createAppContainer(Routes);

export default RoutesContainer;