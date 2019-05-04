import  { createStackNavigator, createAppContainer } from 'react-navigation';


import MainMenu from './pages/mainMenu'
import JSPackageList from './pages/jsPackageList'
import Product from './pages/product'

const Routes = createStackNavigator(
    {
        MainMenu,
        JSPackageList,
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