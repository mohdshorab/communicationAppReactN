import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SharedDocList from "./SharedDocList";
import DocumentList from "./DocumentList";
const Tabs = createBottomTabNavigator();

export default function ManageDocs() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name="Document List" component={DocumentList} />
            <Tabs.Screen name="Shared Document" component={SharedDocList} />
        </Tabs.Navigator>
    )
}