import React from 'react';
import { Page, Text, Image, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import Logo from '../assets/logos/Logo.png';
import amazonIcon from '../assets/links/amazon.png';
import perlegoIcon from '../assets/links/perlego.png';

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        border: '1px solid black',
        padding: 30,
    },
    logoView: {
        width: '100px',
    },
    logo: {
        width: '100%',
        height: 'auto',
    },
    text: {
        color: 'black',
        width: '100%',
    },
    imageGrid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
    },
    imageContainer: {
        flex: '1 1 45%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
    },
    imageView: {
        width: '180px',
        height: '270px',
        borderRadius: 5,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    linksView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '5px',
        width: '150px',
    },
    links: {
        width: 'auto',
        height: '15px',
    }

});

const PDFFile = ({ name, period, goal, books }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.logoView}>
                <Image src={Logo} alt='Logo' style={styles.logo} />
            </View>
            <Text style={styles.text}>Hi {name}, your reading length is {period} and you have selected {goal === 1 ? '1 book' : `${goal} books`}.</Text>
            <View style={styles.imageGrid}>
                {books.map((book, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <View style={styles.imageView}>
                            <Image
                                src={book.image}
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.linksView}>
                            { book.amazon &&
                                <Link src={book.amazon}>
                                    <Image
                                        src={amazonIcon}
                                        style={styles.links}
                                    />
                                </Link>
                            }
                            { book.perlego && 
                                <Link src={book.perlego}>
                                    <Image
                                        src={perlegoIcon}
                                        style={styles.links}
                                    />
                                </Link>
                            }
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default PDFFile;
