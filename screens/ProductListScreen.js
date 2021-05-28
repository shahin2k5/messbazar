import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class ProductListScreen extends Component {
	
	onPresOpen=(screenName)=>{
		this.props.navigation.navigate(screenName);
	}
  render() {
    return (
      <Container>
			 
			<Content style={styles.contentBar}>
				<Grid>
					<Row>
						<Col>
							<TouchableOpacity onPress={()=>this.onPresOpen('ProductDetails')}>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
							</TouchableOpacity>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
						<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
						<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
						<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
						<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
						<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
						<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/product.png')} style={styles.productItemImage}/>
						</Col>
						<Col>
							<Text>চিনিগুড়া চাল</Text>
							<Text>৳৫৫</Text>
						</Col>
						<Col>
						</Col>
						<Col>
							<Image source={require('../assets/images/ProductDetailsScreen/plus.png')} style={styles.productItemPlus}/>
						</Col>
					</Row>
					
					
					
					 
					
				</Grid>
				   
			</Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	contentBar:{
		padding:20
	},
	productItemImage:{
		width:35,
		height:35
	}
});

export default ProductListScreen;