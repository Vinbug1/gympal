import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';

import PostCard from '../user/PostCard';

const { width } = Dimensions.get("window");


const PostList = (props) => {
    const { item } = props;
    return(
        <TouchableOpacity 
        style={{ width: '50%' }}
        onPress={() => 
            props.navigation.navigate("Product Detail", { item: item})
        }
        >
            <View style={{ width: width / 2, 
                backgroundColor: 'gainsboro'}}
        >
            <PostCard {...item} />
            </View>
        </TouchableOpacity>
    )
}

export default PostList

