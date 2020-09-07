import React from "react";
import {StyleSheet, Text} from "react-native";

const styles = StyleSheet.create({
	Title    : {fontSize: 18},
	Subtitle : {fontSize: 16},
	Paragraph: {fontSize: 12},
});

const Title     = (props) => (<Text style={styles.Title}>{props.children}</Text>);
const Subtitle  = (props) => (<Text style={styles.Subtitle}>{props.children}</Text>);
const Paragraph = (props) => (<Text style={styles.Paragraph}>{props.children}</Text>);
