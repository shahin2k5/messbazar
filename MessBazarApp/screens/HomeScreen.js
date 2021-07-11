import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, DrawerLayoutAndroid,
		TouchableOpacity, ToastAndroid  } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Select, Button } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SubCategoryScreen from './SubCategoryScreen';
import * as api from '../services/apiService';
import HeaderScreen from './HeaderScreen';
import { connect, dispatch } from 'react-redux' 
import SelectDropdown from 'react-native-select-dropdown'
import DeviceInfo from 'react-native-device-info';
import * as actions from '../services/actions/actions'


function mapStateToProps(state){
	//console.log('map state category: ', state.categoryReducer.categoryList)
	//console.log('map state product: ', state.productReducer.homepageProductList)
	//console.log('map state cart: ', state.cartReducer.cartList)
	return {
		categoryList: state.categoryReducer.categoryList,
		homepageProductList: state.productReducer.homepageProductList,
		cartList: state.cartReducer.cartList,
		categoryCount: state.categoryReducer.categoryCount,
		user: state.userReducer.user,
		cartTotalFinalSalePrice:state.cartReducer.cartTotalFinalSalePrice
	}
}

function mapDispatchToProps(dispatch){
	return { 
			getCategoryList:data=>dispatch(actions.getCategoryList(data)),
			getHomepageProductLists:data=>dispatch(actions.getHomepageProductList(data)),
			getCartList:data=>dispatch(actions.getCartList(data))
	}
}

const productType = ["হট প্রোডাক্ট", "নতুন প্রোডাক্ট", "অফার প্রোডাক্ট","প্রোডাক্টস..."]


class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.drawer = React.createRef();
		 this.state = {
			  productList: this.props.homepageProductList,
			  categoryList: this.props.categoryList,  
			  categoryListTmp: this.props.categoryList,  
			  cartList: this.props.cartList,  
			  error: false,
			  product_id:'',
			  product_qnty:'0',
			  product_pcs:'0',
			  uniqueId : DeviceInfo.getUniqueId()
		   };
	  }
	  
	componentDidMount(){
		  this.getCategoryrList(); 
		  this.setState({
			  productList: this.props.homepageProductList
		  });
		}
	
	
	getCategoryrList = async () => {
       try { 
	   //console.log(api.apiUrl+"category/list");
			   const response = await fetch(api.apiUrl+"category/list/"+this.state.uniqueId);
			   if (response.ok) {
				   const data = await response.json();
				   //console.log('response data: ',data);
				   this.props.getCategoryList(data.category_list);
				   this.props.getHomepageProductLists(data.product_list);
				   this.props.getCartList(data.cart_list);
				   // this.setState({
					   // categoryList:data,
					   // categoryListTmp:data
				   // })	
				 //this.getHomePageProductList();				   
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
	  }
	  
	getHomePageProductList = async () => {
       try { 
			   const subcatid = this.state.subcatid;
			   const response = await fetch(api.apiUrl+"get_homepage_product_list");
			   if (response.ok) {
				   const data = await response.json();
				   //console.log('response data homepage: ',data);
				   this.props.getHomepageProductLists(data);
				    this.setState({
					  productList: this.props.homepageProductList
				  });		   
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
	  }
	  
	  

	renderCategory=()=>{
		//console.log('render category: ', this.props.categoryList);
		return this.props.categoryList.slice(0, 5).map((category, index)=>{
			 
			return(
				<TouchableOpacity key={index} style={{width:'30%',margin:5}} onPress={()=>this.onPressOpen(category.id)} >
					<View style={styles.btnBackground,{backgroundColor:'#a6Fcc6',borderRadius:20,elevation:9}} >
						<Image source={{uri:(api.apiBaseUrl)+category.image}} style={styles.btnIcon}/>
						
						<Text style={styles.btnTitle}>{category.category_title?category.category_title.substr(0,10):''}</Text>
					</View>
				</TouchableOpacity>
			 
			);
		});
	}
	
	drawerContentView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => this.drawer.current.closeDrawer()}
      />
    </View>
  );
  
  openDrawerT=()=>{
	  this.drawer.current.openDrawer();
  }
  
  onPressOpen=(categoryID)=>{
	  this.props.navigation.navigate('Stack',{screen:'SubCategory',params:{category:categoryID}});
  }
  
   onPressOpenProductDetails=(productid)=>{
		  this.props.navigation.navigate('Stack',{screen:'ProductDetails',params:{productid:productid}});
	  }
  
  searchCategory=(txt)=>{
	let categoryList =  this.state.categoryListTmp;
	let categoryListTmp =  [];
	let txtSearch = txt?txt.toLowerCase():'';
	if(txt){
		categoryListTmp = categoryList.filter(category=>category.category_title.toLowerCase().indexOf(txt)==0);
		//console.log(categoryList)
		this.setState({categoryList:categoryListTmp})	
	}else{
		this.setState({categoryList:this.state.categoryListTmp})	
	}
	
  }
  
   searchProduct=(txt)=>{
	let productList =  this.state.productList;
	 
	let productListTmp =  [];
	let txtSearch = txt?txt.toLowerCase():'';
	if(txt){
		productListTmp = productList.filter(product=>product.product_title.toLowerCase().indexOf(txt)==0);
		 
		this.setState({productList:productListTmp})	
	}else{
		this.setState({productList:this.props.homepageProductList})	
	}
	
  }
  
  
    
   filterHomepageProduct=(txt)=>{
	let productList =  this.props.homepageProductList;
	 
	let productListTmp =  [];
	let txtSearch = '';
	if(txt==0){
		productListTmp = productList.filter(product=>product.hot_product==1);
		console.log('zero:::', productListTmp)
		this.setState({productList:productListTmp})	
	}else if(txt==1){
		productListTmp = productList.filter(product=>product.new_arrival==1);
		console.log("one::::",productListTmp)
		this.setState({productList:productListTmp})	
	}else if(txt==2){
		productListTmp = productList.filter(product=>product.discount_product==1);
		console.log('three:::::',productListTmp)
		this.setState({productList:productListTmp})	
	}else{
		this.setState({productList:this.props.homepageProductList})	
	}
	
  }
  
  
	upQnty=(product)=>{
		//console.log(product);
		product.product_qnty = product.product_qnty+1
		this.setState({
			 product_qnty:this.state.product_qnty+1
		})
		this.addToCart(product);
	}	
	
	downQnty=(product)=>{
		//console.log(product);
		product.product_qnty = product.product_qnty-1
		this.setState({
			product_qnty:this.state.product_qnty-1
		})
		this.addToCart(product);
	}
	
	upPcs=(product)=>{
		//console.log(product);
		product.product_pcs = product.product_pcs+1
		this.setState({
			product_pcs:this.state.product_pcs-1
		})
	 
	}	
	
	downPcs=(product)=>{
		//console.log(product);
		product.product_pcs = product.product_pcs-1
		this.setState({
			product_pcs:this.state.product_pcs-1
		})
	}
 
	addToCart=(product)=>{
		
		  product = {
			  ...product,
			  device_id: this.state.uniqueId
		  };
		  
		  //console.log(product);
		 
		  fetch(api.apiUrl+"cartadd",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			  }).then(response=>response.json()).then(data=>{
				  //console.log('cart add success data: ', data.data);
				  this.props.getCartList(data.data)
				  this.setState({cartList:this.props.cartList})
				  this.showToast();
				//this.props.navigation.navigate('ShoppingCart',{device_id:this.state.uniqueId});
			  },error=>{
				  console.log('error: ', error);
			  }); 
		 
	}
	
	showToast = () => {
    ToastAndroid.show("Product added to cart successfully !", ToastAndroid.SHORT);
  };
   
  
  	renderProduct=()=>{
		return this.state.productList.map((product, index)=>{
			 
			return(
				<Row key={index} style={{borderBottomWidth:1,borderColor:'#ccc',backgroundColor:'#efe',paddingTop:5,paddingBottom:5}}>
						<Col size={17} style={{justifyContent:'center'}}>
							<TouchableOpacity onPress={()=>this.onPressOpenProductDetails(product.id)}>
								<Image source={{uri:api.apiBaseUrl+product.image}} style={{
									height:45,
									width:45,
									marginLeft:5
								}}/>
							</TouchableOpacity>
						</Col>
						
						<Col size={83}>
							<Row>
								<Col size={90}>
									<TouchableOpacity onPress={()=>this.onPressOpenProductDetails(product.id)}>
										<Text style={styles.productTitle}>
										{product.product_title}</Text>
									</TouchableOpacity>
								</Col>
								<Col size={15}>
									<Text  style={{color:'#666'}}>{product.unit_type}</Text>
								</Col>
							</Row>
							<Row>
								<Col size={55}>
									<Row >
										<Col  size={10} >
											{	product.discount>0?
												(<Text style={{textDecorationLine: 'line-through'}}>৳{product.sale_price}</Text>):
												(<Text style={{color:'#109D9D'}}>৳{product.final_sale_price}</Text>)}
										</Col>
										
										<Col  size={10} >
											{	product.discount?
												(<Text style={{color:'#109D9D'}}>৳{product.final_sale_price}</Text>):
												(<Text style={{color:'#109D9D'}}></Text>)}
										</Col>
									</Row>
									<Row></Row>
									{(product.show_pcs_box)?
									(<Row >
										<Col size={5}  style={{justifyContent:'center'}}>
											<Icon name="remove" onPress={()=>{this.downPcs(product)}} style={{fontSize:18}}/>
										</Col>
										<Col size={8} style={{justifyContent:'center'}}>
											<Text>
												 {product.product_pcs?product.product_pcs:0} Pic 
											</Text>
										</Col> 
										<Col size={10}  style={{justifyContent:'center'}}>
											<Icon name="add" onPress={()=>{this.upPcs(product)}} style={{fontSize:18}}/>
										</Col>
									</Row>):(<Text></Text>)}
									<Row></Row>
									<Row></Row>
								</Col>
								 
						
								<Col size={47} style={{justifyContent:'center'}}>
								
									<Row>
										<Col style={{justifyContent:'center'}}>
											<Icon name="remove" onPress={()=>{this.downQnty(product)}} 
												style={styles.lblItemAttrPcsIcon,{marginLeft:'auto',marginRight:3,fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>
										</Col>
										<Col style={{justifyContent:'center'}}>
											<Text style={{textAlign:'center',borderWidth:1,paddingTop:5,paddingBottom:5,borderColor:'#444',color:'#444'}}>{product.product_qnty?product.product_qnty:product.product_qnty=0}</Text>
										</Col>
										<Col style={{justifyContent:'center'}}>
											<Icon name="add" onPress={()=>{this.upQnty(product)}} style={styles.lblItemAttrPcsIcon,{fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>
										</Col>
									</Row>
								</Col>
								 
								 
							</Row>
						</Col>
						
					
					</Row>
					
			);
		});
	}
	
	
  
  render() {
    return (
		<Container>
		  <HeaderScreen navigation={this.props.navigation} total_price={this.props.cartList?this.props.cartList.total_final_price:'0.00'} title={"মেস বাজার"} />
		  <Content>
				
				<Grid>
				
					<Row style={{marginTop:5,marginBottom:5}}>
						<Col>
							<Icon name="home"/>
						</Col>
						<Col style={{justifyContent:'center'}}>
							<Image source={{uri:`${api.apiBaseUrl}assets/images/mobile/logo.png`}} style={{height:45,width:'50%'}}/>
						</Col>
						<Col style={{justifyContent:'center'}}>
									
						 				
										<Col>
											 
											 <Item style={{marginLeft:10}}>
												<Input placeholder="প্রোডাক্ট খুঁজুন" onChangeText={txt=>this.searchProduct(txt)}/>
												<Icon type={"FontAwesome"} active name='search' />
											</Item>
										
										</Col>
										 
									 
								
								
							 
						</Col>
					</Row>
					<Row>
						<Col>
						 <Image source={{uri:`${api.apiBaseUrl}assets/images/mobile/slider-01.jpeg`}} style={{height:150,width:'100%'}}/> 
						</Col>
					</Row>
					 
					<Row style={{borderBottomWidth:.5,borderColor:'#ccc'}}>
						<Col style={{margin:5}} size={90}>
							<Text style={{textAlign:'right'}}>
								আরও ক্যাটাগরি
								
							</Text>
						</Col>
						<Col size={10} style={{justifyContent:'center'}}>
							<TouchableOpacity onPress={()=>{this.props.navigation.navigate('Stack',{screen:'Category'})}}>
							<Icon type="FontAwesome" name="th-large" style={{fontSize:20,color:'#555'}}/>
							</TouchableOpacity>
						</Col>
					</Row>
					<View style={{flex:1, flexDirection:'row',flexWrap:'wrap',justifyContent:'center',marginTop:5,marginLeft:5}}>
						{this.renderCategory()}
					</View>
					
					<Row>
					<Col size={30}></Col>
					<Col size={17} style={{justifyContent:'center'}}>	 
						<SelectDropdown
						data={productType}
						onSelect={(selectedItem, index) => {
							//console.log(selectedItem, index)
							this.filterHomepageProduct(index)
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							// text represented after item is selected
							// if data array is an array of objects then return selectedItem.property to render after item is selected
							return selectedItem
						}}
						rowTextForSelection={(item, index) => {
							// text represented for each item in dropdown
							// if data array is an array of objects then return item.property to represent item in dropdown
							return item
						}}
						
						buttonStyle={{backgroundColor:'#efe'}}
						buttonTextStyle={{fontSize:14}}
						defaultValueByIndex='3'
						
						 
					/>

					</Col>
					<Col size={7} style={{justifyContent:'center'}}>
						<Icon name="chevron-down"/>	
					</Col>
					</Row>
					{this.renderProduct()}
				</Grid>
				   
			</Content>
		 
		</Container>
    );
  }
}

const styles = StyleSheet.create({
	 btnBackgroundTop: { 
		width: '100%',
		height: 40,
		justifyContent:'center',
		textAlign: "center",
	  },  
	  btnTextTop:{
		  height:20,
		  width:105,
		  marginTop:-7,
		  marginLeft:30
	  },
	  productTitle:{
		  fontWeight:'bold',
		  color:'#6E2C00',
		  fontSize:18
	  },
	  btnBackground: { 
		width: '100%',
		height: 150,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		 
	  }, 
	  btnText: { 
		width: 80,
		height: 25,
		marginTop:10,
		resizeMode:'cover',
		marginBottom:10
	  },
	    btnIcon: { 
		width: 30,
		height: 30,
		marginLeft:'25%',
		marginTop:10
	  },
	   container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 16
	  },
	  navigationContainer: {
		backgroundColor: "#ecf0f1"
	  },
	  paragraph: {
		padding: 16,
		fontSize: 15,
		textAlign: "center"
	  },
	  button:{
		 margin:5,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
		 
	  },
	  btnContainer:{
		justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
	  },
	  btnTitle:{
		  fontSize:14,
		  textAlign:'center',
		  marginBottom:6,
		  flexGrow: 1,
        flex: 1,
		flexDirection:'row'
		  
	  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen); 
