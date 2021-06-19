import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground, TouchableOpacity  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class SubCategoryScreen extends Component {
	
	 constructor(props) {
		super(props);
		 this.state = {
			  subcategoryList: [], // list is empty in the beginning
			  error: false
		   };
	  }
	  
	 componentDidMount(){
		  this.getSubCategoryList();
		}	  
		
	componentDidUpdate(){
		  this.getSubCategoryList();
		}
		
 
		
	getSubCategoryList = async () => {
       try { 
			   const catid = this.props.route.params.category;
			   const response = await fetch("http://127.0.0.1:8000/api/subcategory/list/"+catid);
			   if (response.ok) {
				   const data = await response.json();
				   // console.log('response data: ',data);
				   this.setState({
					   subcategoryList:data
				   })		   
			   } else { this.setState({ error: true }) }
		   } catch (e) { 
				console.log('error: ',e);
			}
	  }

	renderCategory=()=>{
		return this.state.subcategoryList.map((subcategory, index)=>{
			var icon = subcategory.image;
			return(
				<TouchableOpacity key={index} size={32} style={styles.button} onPress={()=>this.onPressOpen(subcategory.id)} >
					<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-6.png')} style={styles.btnBackground}>
						<Image source={require('../assets/images/CategoryScreen/chal_bosta.png')} 				style={styles.btnText}/>
						<Image source={require('../assets/images/CategoryScreen/chal_text.png')} 				style={styles.btnText}/>
						<Text style={styles.btnTitle}>{subcategory.category_title}</Text>
					</ImageBackground>
				</TouchableOpacity>
			 
			);
		});
	}
	
 onPressOpen=(subcategoryID)=>{
	  this.props.navigation.navigate('ProductList',{subcategory:subcategoryID});
  }
  
  render() {
    return (
      <Container>
			 <Header />
			<Content>
				<Grid>
					<Row>
						<Col></Col>
						<Col>
							<ImageBackground source={require('../assets/images/CategoryScreen/Rectangle-28.png')} style={styles.btnBackgroundTop}>
								<Image source={require('../assets/images/CategoryScreen/bazar-talika.png')} style={styles.btnTextTop}/>
							</ImageBackground>
						</Col>
					</Row>
					
					<Row>
						 
						<Col>
							<Image source={require('../assets/images/CategoryScreen/apnar-category.png')}/>
							<Image source={require('../assets/images/CategoryScreen/Line-9.png')}/>
						</Col>
					</Row>
					<Row style={styles.btnContainer}>
						{this.renderCategory()}
					</Row>
					
					
					 
					
				</Grid>
				   
			</Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	 btnBackgroundTop: { 
		width: '100%',
		height: 50,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center'
	  },  
	  btnTextTop:{
		  height:20,
		  width:105,
		  marginTop:-7
	  },
	  
	  btnBackground: { 
		width: '100%',
		height: 100,
		justifyContent:'center',
		textAlign: "center",
		alignItems:'center',
		 
	  }, 
	  btnText: { 
		width: '60%',
		height: 20,
		marginTop:0,
		resizeMode:'cover'
	  },
	    btnIcon: { 
		width: 35,
		height: 35,
		marginLeft:'13%',
		marginTop:0
	  },
	   button:{
		width:'33%'
	  },
	  btnContainer:{
		  flexWrap:'wrap',
		  flexDirection:'row'
	  },
	  btnTitle:{
		  fontSize:15,
		  fontWeight:'bold'
	  }
});

export default SubCategoryScreen;