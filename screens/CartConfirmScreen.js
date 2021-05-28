import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, ImageBackground  } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class ProductListScreen extends Component {
  render() {
    return (
      <Container>
		
			<Content style={styles.contentBar}>
				<Grid>
					<Row>
						 
						<Col >
							<Text style={styles.bgTxt}>চিনিগুড়া চাল</Text>
						</Col>	
						<Col>
							<Text style={styles.bgTxt}>১ কেজি</Text>	
						</Col>	
						
						<Col>
							<Text style={styles.bgTxt}>৳৫৫</Text>	
						</Col>
				 
					 
					</Row>
					<Row>
						 
						<Col >
							<Text style={styles.bgTxt}>চিনিগুড়া চাল</Text>
						</Col>	
						<Col>
							<Text style={styles.bgTxt}>১ কেজি</Text>	
						</Col>	
						
						<Col>
							<Text style={styles.bgTxt}>৳৫৫</Text>	
						</Col>
				 
					 
					</Row>
					<Row>
						 
						<Col >
							<Text style={styles.bgTxt}>চিনিগুড়া চাল</Text>
						</Col>	
						<Col>
							<Text style={styles.bgTxt}>১ কেজি</Text>	
						</Col>	
						
						<Col>
							<Text style={styles.bgTxt}>৳৫৫</Text>	
						</Col>
				 
					 
					</Row>
					<Row>
						 
						<Col >
							<Text style={styles.bgTxt}>চিনিগুড়া চাল</Text>
						</Col>	
						<Col>
							<Text style={styles.bgTxt}>১ কেজি</Text>	
						</Col>	
						
						<Col>
							<Text style={styles.bgTxt}>৳৫৫</Text>	
						</Col>
				 
					 
					</Row>
					<Row>
						 
						<Col >
							<Text style={styles.bgTxt}>চিনিগুড়া চাল</Text>
						</Col>	
						<Col>
							<Text style={styles.bgTxt}>১ কেজি</Text>	
						</Col>	
						
						<Col>
							<Text style={styles.bgTxt}>৳৫৫</Text>	
						</Col>
				 
					 
					</Row>
					<Row>
						 
						<Col >
							<Text style={styles.bgTxt}>চিনিগুড়া চাল</Text>
						</Col>	
						<Col>
							<Text style={styles.bgTxt}>১ কেজি</Text>	
						</Col>	
						
						<Col>
							<Text style={styles.bgTxt}>৳৫৫</Text>	
						</Col>
				 
					 
					</Row>
					<Row>
						 
						<Col >
							<Text style={styles.bgTxt}>চিনিগুড়া চাল</Text>
						</Col>	
						<Col>
							<Text style={styles.bgTxt}>১ কেজি</Text>	
						</Col>	
						
						<Col>
							<Text style={styles.bgTxt}>৳৫৫</Text>	
						</Col>
				 
					 
					</Row>
					
					<Row>
						 
						<Col >
							<Text style={styles.bgTxt}>চিনিগুড়া চাল</Text>
						</Col>	
						<Col>
							<Text style={styles.bgTxt}>১ কেজি</Text>	
						</Col>	
						
						<Col>
							<Text style={styles.bgTxt}>৳৫৫</Text>	
						</Col>
				 
					 
					</Row>
					
					
					
					
					<Row style={{marginTop:400,backgroundColor:'#cafacc'}}>
						 
						<Col >
							<Text >আগের তালিকা</Text>
						</Col>	
						<Col>
							 
						</Col>	
						
						<Col>
							<Text >পাঠান</Text>	
						</Col>
				 
					 
					</Row>
					
					
					
					<Row style={{marginBottom:0,marginTop:450,backgroundColor:'#cafacc'}}>
						 
						<Col >
							<Text>মোট মূল্য</Text>
						</Col>	
						<Col>
							 
						</Col>	
						
						<Col>
							<Text>$২৯০</Text>	
						</Col>
				 
					 
					</Row>
				 
				 
					
				</Grid>
				   
			</Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
	bgTxt:{
		backgroundColor:'#ddd',
		padding:5,
		textAlign:'center',
		width:'100%'
	}
	 
});

export default ProductListScreen;