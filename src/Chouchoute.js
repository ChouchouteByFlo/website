console.log('Hello Webpack !');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import toastr from 'toastr';
import Slider from 'react-slick';
import scrollIntoView from 'scroll-into-view-if-needed';
import Emojoy from './Emojoy';

import logo from './assets/images/logo.png';
import flo from './assets/images/flo.jpg';
import imgSourire from './assets/images/sourire.jpg';
import img1 from './assets/images/sample-1.jpg';
import img2 from './assets/images/sample-2.jpg';
import img3 from './assets/images/sample-3.jpg';
import img4 from './assets/images/sample-4.jpg';
import img5 from './assets/images/sample-5.jpg';
import img6 from './assets/images/sample-6.jpg';
import offer from './assets/images/offer.jpg';
import './assets/stylesheets/style.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/slick-carousel/slick/slick.css'; 
import '../node_modules/slick-carousel/slick/slick-theme.css';

const HOOK_PART_ONE = 'T3X6T9YG5';
const HOOK_PART_TWO = 'BS4RGLOCK';
const HOOK_PART_THREE = '6dyhTJ7EMRlUoq6Vu9FSdYhF';

class Chouchoute extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      name: null,
      email: null,
      phone: null,
      content: null,
      message: '',
      sending: false
    }

    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.formattedData = this.formattedData.bind(this);
    this.contact = this.contact.bind(this);
    this.offer = this.offer.bind(this);
    this.send = this.send.bind(this);
  }


  formattedData() {
    let { name, email, phone, content, message } = this.state;  
    let messageContent = content ? content : message; 
    let phoneNum = phone ? phone : 'Non renseigné'
    let text = `<@flo> Formulaire de contact\n\nMessage de ${name}\n:email: ${email}\n:phone: ${phoneNum}\n\n${messageContent}`;

    return (
      JSON.stringify(
        {
          "text": text
        }
      )
    );
  }
  
  send() {
    let { name, email, content, message } = this.state;  
    let messageContent = content ? content : message; 
    let hookPartOne = HOOK_PART_ONE.replace(/G5/, 'G4');
    let hookPartTwo = HOOK_PART_TWO.replace(/OCK/, 'KEY');

    if (name && email && messageContent) {
      if (/\S+@\S+\.\S+/.test(email)) {
        axios.post(
          `https://hooks.slack.com/services/${hookPartOne}/${hookPartTwo}/${HOOK_PART_THREE}`, 
          this.formattedData(), 
          {
            withCredentials: false,
            transformRequest: [
              (data, headers) => {
                delete headers.post["Content-Type"]
                return data
              }
            ]
          }
        ).then(res => {
          if (res.status === 200) {
            toastr.success('Message envoyé avec succes !')
          } else {
            toastr.success('Une erreur est survenu ...')
          }
          console.log(res);
          console.log(res.data);
        })
      } else {
        toastr.error('Veuillez entrer une adresse email valide')
      }
    } else {
      if (!messageContent) {
        toastr.error('Veuillez entrer un message')
      }
      if (!email) {
        toastr.error('Veuillez entrer une adresse email')
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        toastr.error('Veuillez entrer une adresse email valide')
      }
      if (!name) {
        toastr.error('Veuillez entrer votre nom et prénom')
      }
    }
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleName(event) {
    this.setState({
      name: event.target.value
    });
  }

  handlePhone(event) {
    this.setState({
      phone: event.target.value
    });
  }

  handleContent(event) {
    this.setState({
      message: '',
      content: event.target.value
    });
  }

  contact(event) {
    const node = document.getElementById('contact');
    const massage = event.target.value;

    this.setState({
      message: `Salut Flo, je suis intéressée par le massage ${massage} !\nPeux-tu me recontacter très vite ! 😃`
    });

    scrollIntoView(node, {
      block: 'center',
      behavior: 'smooth'
    });
  }

  offer() {
    const node = document.getElementById('contact');

    this.setState({
      message: `Salut Flo, j'aimerais offrir un moment de détente !\n\nPersonne à chouchouter :\nType de massage:\n\nPeux-tu me recontacter très vite !`
    });

    scrollIntoView(node, {
      block: 'center',
      behavior: 'smooth'
    });
  }

  render() {
    const settings = {
      className: "slider variable-width",
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true
    };

    let {content, message} = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <header>
            <img className='img-logo' src={logo} />
            <nav>
              <ul>
                <li>
                  <a href='#chouchoute'>Chouchoute</a>
                </li>
                <li>
                  <a href='#by-flo'>By Flo</a>
                </li>
                <li>
                  <a href='#massages'>Votre massage</a>
                </li>
                <li>
                  <a href='#gift-card'>Carte cadeau</a>
                </li>
                <li>
                  <a href='#contact'>Me contacter</a>
                </li>             
              </ul>
            </nav>
          </header>
        </div>

        <div className='img-line'>
          <Slider {...settings}>
            <img className='img-line-item' src={img1} />
            <img className='img-line-item' src={img2} />
            <img className='img-line-item' src={img3} />
            <img className='img-line-item' src={img4} />
            <img className='img-line-item' src={img5} />
            <img className='img-line-item' src={img6} />
          </Slider>
        </div>

        <div id='chouchoute' className='row part'>
          <div className='col-sm-12 part-title'>
            <h2 className='title title-champagne'>Chouchoute<br/><div className='title-deco'/></h2>
          </div>

          <div className='col-sm-12'>
            <p className='text text-semi-dark'>On vous a peut-être offert un massage, à moins que vous ayez réussi à faire garder vos enfant quelques heures pour enfin penser à vous !?</p>
            <h3 className='title title-sub title-dark'>Vous êtes au bon endroit pour prendre soin de vous !</h3>
            <p className='text text-semi-dark'>Si les Balinais se massent tous le temps, c'est qu'ils ont compris que les massages agissent de façon positive sur nos émotions et cela améliore la qualité du sommeil, réduit les tensions et redonne le sourire (le fameux que vous voyez partout en Asie).</p>
            <img className='img-text' src={imgSourire} />
            <p className='text text-semi-dark'>A Bali, comme à Java ou Lombok, le massage est un art de vivre pratiqué par tous, qui permet de se sentir bien au quotidien et qui tire plusieurs de ses mouvements des techniques de médecine locales, ayurvédique et chinoise.</p>
            <p className='text text-semi-dark'>En Indonésie le massage permet de prendre soin de son corps tout comme le sport ou la nutrition et grâce à ses mouvements toniques mais profonds le massage Balinais</p>
          </div>
        </div>

        <div id='by-flo' className='row part-dark'>
          <div className='col-sm-12 part-title'>
            <h2 className='title title-dark title-champagne'>By Flo<br/><div className='title-deco'/></h2>
          </div>

          <div className='col-sm-4 col-md-3 col-lg-2'>
          <img className='img-by-flo' src={flo} />
          </div>

          <div className='col-sm-8 col-md-9 col-lg-10'>
            <p className='text text-dark'>Moi c’est Flo ! J’aime le contact humain, bavarder, rigoler, prendre le temps de vous chouchouter et tout ça dans une ambiance apaisante ! Pourtant...</p>
            <h3 className='title title-sub title-dark'>Petit retour en arrière</h3>
            <p className='text text-dark'>Nous sommes en 2016 quand mon adorable chéri m’organise un voyage surprise en Thaïlande ! Cela faisait un bout de temps que je voulais découvrir l’Asie, ses cultures, ses cuisines, ses sourires, mais surtout... ses massages !</p>
            <p className='text text-dark'>Quelques jours après notre arrivée, c’est tout naturellement qu’au détour d’une petite rue de Chiang-Mai, nous avons tenté à l’improviste un salon de massage et ce fut une délicieuse... torture !</p>
            <p className='text text-dark'>Après avoir essayé la fameuse technique du “soft please” avec le sourire, nous avons dû nous rendre à l’évidence, nos masseuses avaient déjà enclenché le mode touristes douillets et il ne nous restait alors qu’une option :  subir et contenir nos fous rires naissants à chaque croisement de regard !</p>
            <p className='text text-dark'>Ressortis vivants et étonnamment détendu de cette expérience mémorable, j’aurais pu m’arrêter là et me dire que les massages n’étaient pas pour moi, mais c’est mal me connaître !</p>
            <h3 className='title title-sub title-dark'>Des mois plus tard...</h3>
            <p className='text text-dark'>En 2018 me voilà dans le 11ème arrondissement de Paris au côté de Ruth Indiathi, dans l’école de formation professionnelle « Le village balinais », réputée pour son savoir-faire et son respect des pratiques traditionnelles du massage indonésien.</p>
            <p className='text text-dark'>L’apprentissage du massage et la bienveillance ambiante qui règne autour de la culture Indonésienne me séduit tellement que je prends alors la décision de quitter mon boulot d’aide à la personne pour poursuivre ma formation avec Ruth.</p>
            <p className='text text-dark'>Aujourd’hui me voilà embarquée dans cette belle aventure à laquelle je ne m’attendais pas il y a quelques années et je dois bien avouer que cela me plait !</p>
            <p className='text text-dark'>Depuis la fin de l’année 2019 vous pouvez venir profiter d’un massage dans un espace chaleureux que j’ai aménagé à mon domicile !</p>
          </div>
        </div>

        <div className='part-bottom' />

        <div id='massages' className='row part'>
          <div className='col-sm-12 part-title'>
            <h2 className='title title-champagne'>Votre massage<br/><div className='title-deco'/></h2>
          </div>
          <div className='massage-item col-sm-6'>
            <h2 className='title title-sub title-dark'><Emojoy name='wangi' /> Wangi, <span className='text text-small text-champagne'>L'Aventurière</span> </h2>
            <p className='text text-dark'>Découvrez le massage du corps balinais, apaisant et enveloppant. Destiné aux rêveuses et audacieuses !</p>
            <button 
              className='button-normal'
              onClick={this.contact}  
              value='Wangi'
            >
              Chouchoute mon corps | 50€
            </button>
          </div>
          <div className='massage-item col-sm-6'>
            <h2 className='title title-sub title-dark'><Emojoy name='murniati' /> Murniati, <span className='text text-small text-champagne'>L'Énergique</span></h2>
            <p className='text text-dark'>Gardez votre ligne grâce à ce massage raffermissant, tonique et réconfortant. Favorise la confiance en soi !</p>
            <button 
              className='button-normal'
              onClick={this.contact} 
              value='Murniati'  
            >
              Chouchoute ma ligne | 60€
            </button>
          </div>
          <div className='massage-item col-sm-6'>
            <h2 className='title title-sub title-dark'><Emojoy name='indah' special={true} /> Indah, <span className='text text-small text-champagne'>La Majestueuse</span></h2>
            <p className='text text-dark'>Chouchoutage absolu sur tout le corps. Procure une détente intense !</p>
            <button 
              className='button-normal'
              onClick={this.contact}
              value='Indah'  
            >
              Chouchoute intégral | 80€
            </button>
          </div>
          <div className='massage-item col-sm-6'>
            <h2 className='title title-sub title-dark'><Emojoy name='dewi' special={true} /> Dewi, <span className='text text-small text-champagne'>La Flamboyante</span></h2>
            <p className='text text-dark'>Ce soin traditionnel balinais allie bien-être et beauté des cheveux. Effet relaxant et décoiffant garanti !</p>
            <button 
              className='button-normal'
              onClick={this.contact}  
              value='Dewi'
            >
              Chouchoute ma chevelure | 50€
            </button>
          </div>
          <div className='massage-item col-sm-6'>
            <h2 className='title title-sub title-dark'><Emojoy name='lestari' /> Lestari, <span className='text text-small text-champagne'>L'Éternelle !</span></h2>
            <p className='text text-dark'>Retrouvez une mine radieuse avec ce massage liftant du visage !</p>
            <button 
              className='button-normal'
              onClick={this.contact}  
              value='Lestari'
            >
              Chouchoute mon visage d'ange | 50€
            </button>
          </div>
        </div>

        <div id='gift-card' className='row part'>
          <div className='col-sm-12 part-title'>
            <h2 className='title title-champagne'>Carte cadeau<br/><div className='title-deco'/></h2>
          </div>

          <div className='col-sm-5'>
            <img className='img-full img-rounded' src={offer} />
          </div>  
          <div className='col-sm-7'>
            <p className='text text-semi-dark'>
              Noël, anniversaire, fête des mères, ou simplement pour faire plaisir à ton amie qui a besoin de se détendre ! Il te suffit de cliquer sur le bouton ci-dessous 👇 en précisant le massage à offrir ainsi que la personne à chouchouter !<br/><br/>Vous receverez ensuite votre carte cadeau par email avec un code à me transmettre le jour du massage.<br/><br/>Carte cadeau valable pendant un an !
            </p>
            <br/>
            <button 
              className='button-normal'
              onClick={this.offer}  
            >
              Offrir un moment de détente !
            </button>
          </div>    
        </div>

        <div id='contact' className='row part' ref='contact'>
          <div className='col-sm-12 part-title'>
            <h2 className='title title-champagne'>Contact<br/><div className='title-deco'/></h2>
          </div>

          <div className='col-sm-4'>
            <p className='text text-semi-dark'>📅 <b className='text-dark'>Horaires</b> mardi-samedi  10:00-19:00</p> 
            <p className='text text-semi-dark'>📞 <b className='text-dark'>Téléphone</b> +336 52.18.72.92</p>
            <p className='text text-semi-dark'>📫 <b className='text-dark'>Adresse</b> 29, rue Antoine Condorcet<br/><span className='text-middle'>└───▸ </span> &nbsp;&nbsp;&nbsp;56000 VANNES</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d42999.55067623435!2d-2.738819!3d47.655828!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9b66e6986c6242f4!2sChouchoute%20by%20Flo!5e0!3m2!1sfr!2sfr!4v1577725715443!5m2!1sfr!2sfr"></iframe>
          </div>

          <div className='col-sm-8'>
            <input 
              type='text'
              className='form form-item form-text'
              placeholder='👩 Mon nom et prénom'
              onChange={this.handleName}
            />
            <input 
              type='text'
              className='form form-item form-text'
              placeholder='✉️ Mon email'
              onChange={this.handleEmail}
            />
            <input 
              type='text'
              className='form form-item form-text'
              placeholder='📞 Mon numéro de telephone'
              onChange={this.handlePhone}
            />
            <textarea 
              className='form form-item form-textarea'
              placeholder='💬 Ma demande'
              onChange={this.handleContent}
              value={content ? content : message}
            />
            <input 
              className='form form-submit'
              type='submit' 
              onClick={this.send} 
            />
          </div>
        </div>
      </div>
    )
  }
}

const yieldNode = document.querySelector('#yield');
ReactDOM.render(
  <Chouchoute />,
  yieldNode
);