import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, DrawerLayoutAndroid,
		TouchableOpacity, ToastAndroid  } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Select, Button, Footer, FooterTab } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SubCategoryScreen from './SubCategoryScreen';
import * as api from '../services/apiService';
import HeaderScreen from './HeaderScreen';
import { connect } from 'react-redux' 
import SelectDropdown from 'react-native-select-dropdown'
import DeviceInfo from 'react-native-device-info';
import {apiUrl} from '../services/apiService';

function mapStateToProps(state){
	//console.log()
	return {
		categoryList: state.categoryReducer.categoryList,
		cartList: state.cartReducer.cartList,
		categoryCount: state.categoryReducer.categoryCount,
		user: state.userReducer.user
	}
}
const countries = ["Egypt", "Canada", "Australia", "Ireland"]


class CategoryScreen extends Component {
	constructor(props) {
		super(props);
		this.drawer = React.createRef();
		 this.state = {
			  productList: [],
			  categoryList: this.props.categoryList,  
			  cartList: this.props.cartList,  
			  categoryListTmp: [],  
			  error: false,
			  product_id:'',
			  product_qnty:'0',
			  product_pcs:'0',
			  uniqueId : DeviceInfo.getUniqueId()
		   };
	  }
	  
	componentDidMount(){
		  //this.getCategoryrList();
		  
		   
		}
		
	getCategoryrList = async () => {
       try { 
	   //console.log(api.apiUrl+"category/list");
			   const response = await fetch(api.apiUrl+"category/list");
			   if (response.ok) {
				   const data = await response.json();
				   //console.log('response data: ',data);
				   this.setState({
					   categoryList:data,
					   categoryListTmp:data
				   })	
				 this.getHomePageProductList();				   
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
				   this.setState({
					   productList:data
				   })		   
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
	  }
	  
	  

	renderCategory=()=>{
		return this.props.categoryList.map((category, index)=>{
			var icon = category.image;
			return(
				<TouchableOpacity key={index} style={styles.button} onPress={()=>this.onPressOpen(category.id)} >
					<View style={styles.btnBackground,{backgroundColor:'#a6Fcc6',borderRadius:20,elevation:9,height:70}} >
						<Image source={{uri:(api.apiBaseUrl)+category.image}} style={{marginLeft:'38%',height:30,width:30,marginTop:10}}/>
						
						<Text style={styles.btnTitle}>{category.category_title.substr(0,10)}</Text>
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
	  this.props.navigation.navigate('SubCategory',{category:categoryID});
  }
  
   onPressOpenProductDetails=(productid)=>{
		  this.props.navigation.navigate('ProductDetails',{productid:productid});
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
	upQnty=(product)=>{
		//console.log(product);
		product.product_qnty = product.product_qnty+1
		this.setState({
			 product_qnty:this.state.product_qnty+1
		})
	}	
	
	downQnty=(product)=>{
		//console.log(product);
		product.product_qnty = product.product_qnty-1
		this.setState({
			product_qnty:this.state.product_qnty-1
		})
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
		 
		  fetch(apiUrl+"cartadd",{
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(product)
			  }).then(response=>response.json()).then(data=>{
				  //console.log('cart add success data: ', data);
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
												 {product.product_pcs?product.product_pcs:0} Pcs 
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
											<Text style={{textAlign:'center',borderWidth:1,paddingTop:5,paddingBottom:5,borderColor:'#444',color:'#444'}}>{product.product_qnty?product.product_qnty:product.product_qnty=1}</Text>
										</Col>
										<Col style={{justifyContent:'center'}}>
											<Icon name="add" onPress={()=>{this.addToCart(product)}} style={styles.lblItemAttrPcsIcon,{fontWeight:'bold',borderWidth:1,textAlign:'center',borderRadius:40,fontSize:16,backgroundColor:'#F1F1F1',borderColor:'red',margin:3,height:30,width:30,paddingTop:7,color:'red'}}/>
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
		  <HeaderScreen navigation={this.props.navigation} total_price={this.props.cartList?this.props.cartList.total_final_price:'0.00'} title={"ক্যাটাগরি"} />
		  <Content>
				
				<Grid>
				
					<Row style={{marginTop:5,marginBottom:5}}>
						<Col style={{paddingLeft:10}}>
							<Icon name="arrow-back" onPress={()=>{this.props.navigation.goBack()}}/>
						</Col>
						<Col style={{justifyContent:'center'}}>
							<Image source={{uri:`${api.apiBaseUrl}assets/images/mobile/logo.png`}} style={{height:45,width:'60%'}}/>
						</Col>
						<Col style={{justifyContent:'center'}}>
							 
								<Row>
								<Col style={{justifyContent:'center',width:'60%'}}>
									<TouchableOpacity onPress={()=>{this.props.navigation.navigate("ShoppingCart",{device_id:this.state.uniqueId})}}>
										 
										<Text style={{textAlign:'right'}}>বাজারের তালিকা</Text>
										
									</TouchableOpacity>
								</Col>
								<Col style={{justifyContent:'center',width:'30%',paddingLeft:5}}>
									<Icon name="list"/>
								</Col>
								</Row>
						</Col>
					</Row>
					<Row>
						<Col>
						 
						</Col>
					</Row>
					 
					
					<Row style={{flex:1, flexDirection:'row', flexWrap:'wrap',marginTop:5,marginLeft:5}}>
						{this.renderCategory()}
					</Row>
					
					 
					 
				</Grid>
				   
			</Content>
		 			
				<Footer style={{
				backgroundColor:'#93FC87'
			}}>
				 
						  <FooterTab>
							<Button style={{backgroundColor:'#93FC87'}} onPress={()=>{this.props.navigation.navigate('Home')}}>
								<Icon name="home"  style={{color:'#333'}}/>
							  <Text>
								হোম
							  </Text>
							 
							</Button>
							
							<Button  style={{backgroundColor:'#93FC87'}}>
							  <Text>TOTAL</Text>
							  <Text>৳ {this.props.cartList.total_final_price}</Text>
							</Button>
							<Button style={{backgroundColor:'#009933',color:'#fff'}}  onPress={()=>{this.props.navigation.navigate("Stack",{screen:'ShoppingCart',params:{device_id:this.state.uniqueId}})}} >
							  <Icon name="basket"/>
							  <Text  style={{color:'#fff'}}>শপিং</Text>
							</Button>
						  </FooterTab>
			</Footer>
      
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
		  color:'#6E2C00'
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
		width:'29.5%',
		margin:7,
		 
	  },
	  btnContainer:{
		  flexWrap:'wrap',
		  flexDirection:'row',
		  marginLeft:3
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

export default connect(mapStateToProps)(CategoryScreen); 
