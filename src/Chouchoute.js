console.log('Hello Webpack !!!');
console.log(process.env.PLOP)

import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import toastr from "toastr";
import Slider from "react-slick";
import scrollIntoView from "scroll-into-view-if-needed";
import Emojoy from "./Emojoy";
import TopTitle from "./TopTitle";
import Title from "./Title";
import DurationPriceBadges from "./DurationPriceBadges";

import logo from "./assets/images/logo-160.jpg";
import flo from "./assets/images/pro-flo.jpg";
import imgSourire from "./assets/images/sourire.jpg";
import img1 from "./assets/images/sample-1.jpg";
import img2 from "./assets/images/sample-2.jpg";
import img3 from "./assets/images/sample-3.jpg";
import img4 from "./assets/images/sample-4.jpg";
import img5 from "./assets/images/sample-5.jpg";
import img6 from "./assets/images/sample-6.jpg";
import offer from "./assets/images/offer.jpg";
import "./assets/stylesheets/style.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/slick-carousel/slick/slick.css"; 
import "../node_modules/slick-carousel/slick/slick-theme.css";

const HOOK_PART_ONE = "T3X6T9YG5";
const HOOK_PART_TWO = "BS4RGLOCK";
const HOOK_PART_THREE = "6dyhTJ7EMRlUoq6Vu9FSdYhF";

class Chouchoute extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      name: null,
      email: null,
      phone: null,
      content: null,
      message: "",
      sending: false
    };

    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.formattedData = this.formattedData.bind(this);
    this.toastError = this.toastError.bind(this);
    this.toastSuccess = this.toastSuccess.bind(this);
    this.contact = this.contact.bind(this);
    this.offer = this.offer.bind(this);
    this.send = this.send.bind(this);
    this.scroll = this.scroll.bind(this);
    this.postSlack = this.postSlack.bind(this);
  }


  formattedData() {
    let { name, email, phone, content, message } = this.state;  
    let messageContent = content ? content : message; 
    let phoneNum = phone ? phone : 'Non renseigné';
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

    if (name && email && messageContent) {
      if (/\S+@\S+\.\S+/.test(email)) {
        this.postSlack();
      } else {
        toastr.error("Veuillez entrer une adresse email valide");
      }
    } else {
      this.toastError(messageContent, email, name);
    }
  }

  postSlack() {
    let hookPartOne = HOOK_PART_ONE.replace(/G5/, 'G4');
    let hookPartTwo = HOOK_PART_TWO.replace(/OCK/, 'KEY');

    axios.post(
      `https://hooks.slack.com/services/${hookPartOne}/${hookPartTwo}/${HOOK_PART_THREE}`, 
      this.formattedData(), 
      {
        withCredentials: false,
        transformRequest: [
          (data, headers) => {
            delete headers.post["Content-Type"];
            return data;
          }
        ]
      }
    ).then(res => { this.toastSuccess(res) });
  }

  toastSuccess(res) {
    if (res.status === 200) {
      toastr.success("Message envoyé avec succes !");
    } else {
      toastr.success("Une erreur est survenu ...");
    }
  }

  toastError(messageContent, email, name) {
    if (!messageContent) {
      toastr.error("Veuillez entrer un message");
    }
    if (!email) {
      toastr.error("Veuillez entrer une adresse email");
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toastr.error("Veuillez entrer une adresse email valide");
    }
    if (!name) {
      toastr.error("Veuillez entrer votre nom et prénom");
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
    const node = document.getElementById("contact");
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
      message: `Salut Flo, j'aimerais offrir un moment de détente !\n\nPersonne à chouchouter :\nType de massage:\n\nPeux-tu me recontacter très vite ! 😃`
    });

    scrollIntoView(node, {
      block: 'center',
      behavior: 'smooth'
    });
  }

  scroll(to) {
    let destination = document.getElementById(to);

    scrollIntoView(destination, {
      block: 'nearest',
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
                  <button onClick={() => this.scroll("chouchoute")}>Chouchoute</button>
                </li>
                <li>
                  <button onClick={() => this.scroll("by-flo")}>By Flo</button>
                </li>
                <li>
                  <button onClick={() => this.scroll("massages")}>Votre massage</button>
                </li>
                <li>
                  <button onClick={() => this.scroll("gift-card")}>Carte cadeau</button>
                </li>
                <li>
                  <button onClick={() => this.scroll("contact")}>Me contacter</button>
                </li>             
              </ul>
            </nav>
          </header>
        </div>

        <div className='img-line'>
          <Slider {...settings}>
            <img className='img-line-item' src={img1} alt="massage du visage" />
            <img className='img-line-item' src={img2} alt="espace de massage"  />
            <img className='img-line-item' src={img3} alt="photo de Bali"  />
            <img className='img-line-item' src={img4} alt="huiles de massage"  />
            <img className='img-line-item' src={img5} alt="fleurs rose"  />
            <img className='img-line-item' src={img6} alt="décoration salon d'attente"  />
          </Slider>
        </div>

        <div id='chouchoute' className='row part'>
          <Title content='Chouchoute' />

          <div className='col-sm-12'>
          </div>

          <div className='col-sm-7'>
            <p className='text text-semi-dark'>On vous a peut-être offert un massage ? A moins que vous ayez réussi à faire garder vos enfants quelques heures pour enfin penser à vous !?</p>
            <h3 className='title title-sub title-peps'>Vous êtes au bon endroit pour prendre soin de vous !</h3>
            <p className='text text-semi-dark'>Pourquoi croyez-vous que les Balinais sont de si grands adeptes des massages ? Ils ont bien compris qu’ils agissent de façon positive sur nos émotions, améliorent la qualité du sommeil, réduisent les tensions et redonnent le sourire (oui oui, je parle bien de celui que vous voyez partout en Asie 😃).</p>
            <p className='text text-semi-dark'>À Bali, comme à Java ou Lombok, le massage est un art de vivre pratiqué par tous qui permet de se sentir bien au quotidien. Il tire plusieurs de ses mouvements de la médecine ayurvédique et chinoise et des techniques de  médecines locales. Plus qu'un simple moment de détente, le massage est synonyme d'une bonne hygiène de vie comme le serait le sport ou la nutrition en occident. Il offre au corps apaisement et revitalisation grâce à ses mouvements toniques mais profonds !</p>
            <p className='text text-semi-dark'>Le massage balinais a tout d'une danse au rythme lent. Il offrira une relaxation profonde et durable à votre corps... et votre esprit ! Durant votre massage vous pourrez compter sur mon entière bienveillance. Toute mon attention sera mobilisée afin d’évaluer vos besoins et vous faire passer un agréable moment.</p>
            <p className='title title-sub title-dark'>Au plaisir de vous chouchouter !</p>
          </div>
          <div className='col-sm-5'>
            <img className='img-text' src={imgSourire} alt="Yuyu et Iva pendant un massage"  />
            <p className='text text-legend'>Yuyu et Iva qui viennent d'inventer "l'inception massage" 🌀</p>
          </div>

          <div className='col-sm-12'>
          </div>
        </div>

        <div id='by-flo' className='row part-dark'>
          <Title content='By Flo' />

          <div id="img-flo" className='col-sm-3'>
            <img className='img-by-flo' src={flo} alt="Flo pendant un massage" />
          </div>

          <div className='col-sm-9'>
            <p className='text text-dark'>Moi c’est Flo ! J’aime le contact humain, bavarder, rigoler, prendre le temps de vous chouchouter et tout ça dans une ambiance apaisante ! Pourtant...</p>
            <h3 className='title title-sub title-peps'>Petit retour en arrière</h3>
            <p className='text text-dark'>Nous sommes en 2016 quand mon adorable chéri m’organise un voyage surprise en Thaïlande ! Cela faisait un bout de temps que je voulais découvrir l’Asie, ses cultures, ses cuisines, ses sourires, mais surtout... ses massages !</p>
            <p className='text text-dark'>Quelques jours après notre arrivée, c’est tout naturellement qu’au détour d’une petite rue de Chiang-Mai, nous avons tenté à l’improviste un salon de massage et ce fut une délicieuse... torture !</p>
            <p className='text text-dark'>Après avoir supplié nos masseuses à coup de “soft please”, nous avons dû nous rendre à l’évidence, il ne nous restait qu’une option : subir et contenir nos fous rires naissants à chaque croisement de regard !</p>
            <p className='text text-dark'>Ressortie vivante et étonnamment détendue de cette expérience, j’aurais pu m’arrêter là et me dire que les massages n’étaient pas pour moi, mais c’est mal me connaître !</p>
            <h3 className='title title-sub title-peps'>Des mois plus tard...</h3>
            <p className='text text-dark'>En 2018, me voilà à Paris, intégrant l’école de formation professionnelle « Le village balinais » réputée pour son savoir-faire et son respect des pratiques traditionnelles du massage indonésien, au côté de Ruth Indiathi.</p>
            <p className='text text-dark'>L’apprentissage du massage et la bienveillance ambiante qui règne autour de la culture Indonésienne me séduit tellement que je prends alors la décision de quitter mon boulot d’aide à la personne pour poursuivre ma formation avec Ruth.</p>
            <p className='text text-dark'>Aujourd’hui me voilà embarquée dans cette belle aventure à laquelle je ne m’attendais pas il y a quelques années et je dois bien avouer que cela me plait !</p>
            <p className='text text-dark'>Depuis la fin de l’année 2019 vous pouvez venir profiter d’un massage dans un espace chaleureux que j’ai aménagé à mon domicile !</p>
          </div>
        </div>

        <div className='part-bottom' />

        <div id='massages' className='row part'>
          <TopTitle content='Votre massage' />

          <div className='massage-item col-sm-6'>
            <h2 className='title title-sub title-dark'><Emojoy name='wangi' /> Wangi, <span className='text text-small text-champagne'>L'Aventurière !</span> <DurationPriceBadges duration="30" price="35" /></h2>
            <p className='text text-dark'>Découvrez l’authentique massage du corps indonésien, apaisant, enveloppant et tonique. Il procure une détente profonde.</p>
            <p className="text text-peps">Destiné aux rêveuses et audacieuses !</p>
            <p className='text text-dark'>Choisissez 2 à 3 zones du corps à masser (pieds/jambes, dos*, ventre, bras/mains, visage/cuir chevelu) 
*équivaut à 2 zones</p>
            <p className='text text-dark'>Massage aux huiles végétales de coco, sésame et macadamia. (tous les produits sont issus de l’agriculture biologique, 100% purs et naturels).</p>
            <button 
              className='button-normal'
              onClick={this.contact}  
              value='Wangi'
            >
              Chouchoute découverte
            </button>
          </div>
          <div className='massage-item col-sm-6'>
            <h2 className='title title-sub title-dark'><Emojoy name='murniati' /> Murniati, <span className='text text-small text-champagne'>L'Énergique !</span> <DurationPriceBadges duration="60" price="60" /> <span className="text text-or">ou</span> <DurationPriceBadges duration="30" price="35" /></h2>
            <p className='text text-dark'>Gardez votre ligne grâce à ce massage raffermissant, tonique et réconfortant sur le corps. Ce massage s’attarde tout particulièrement sur la zone ventrale permettant un drainage et une détente absolue de l’appareil digestif.</p>
            <p className="text text-peps">Etat méditatif assuré !</p>
            <p className='text text-dark'>Massage aux huiles végétales de coco, sésame et macadamia. (tous les produits sont issus de l’agriculture biologique, 100% purs et naturels).</p>
            <button 
              className='button-normal'
              onClick={this.contact} 
              value='Murniati'  
            >
              Chouchoute mon ventre
            </button>
          </div>
          <div className='massage-item col-sm-6'>
            <h2 className='title title-sub title-dark'><Emojoy name='indah' special={true} /> Indah, <span className='text text-small text-champagne'>La Majestueuse !</span> <DurationPriceBadges duration="90" price="80" /></h2>
            <p className='text text-dark'>Chouchoutage absolu des pieds à la tête. Issu du rituel traditionnel de bien-être balinais, ce massage procure un effet à la fois relaxant et vivifiant qui invite au lâcher-prise.</p>
            <p className="text text-peps">Relaxation complète du corps et de l’esprit !</p>
            <p className='text text-dark'>Massage aux huiles végétales de coco, sésame et macadamia. (tous les produits sont issus de l’agriculture biologique, 100% purs et naturels).</p>
            <button 
              className='button-normal'
              onClick={this.contact}
              value='Indah'  
            >
              Chouchoute intégral
            </button>
          </div>
          <div className='massage-item col-sm-6'>
            <h2 className='title title-sub title-dark'><Emojoy name='lestari' /> Lestari, <span className='text text-small text-champagne'>L'Éternelle !</span> <DurationPriceBadges duration="50" price="45" /></h2>
            <p className='text text-dark'>Véritable soin de jouvence, ce massage allie beauté du visage et bien-être. Il apporte au visage un effet liftant en stimulant la microcirculation sanguine et procure un état d’apaisement.</p>
            <p className="text text-peps">Retrouvez une mine radieuse avec ce massage liftant du visage !</p>
            <p className='text text-dark'>Massage à l’huile végétale de chanvre, beurre de karité et huile essentielle de bois de rose (tous les produits sont issus de l’agriculture biologique, 100% purs et naturels).</p>
            <button 
              className='button-normal'
              onClick={this.contact}  
              value='Lestari'
            >
              Chouchoute mon visage d'ange
            </button>
          </div>
          <div className='massage-item col-sm-6'>
            <h2 className='title title-sub title-dark'><Emojoy name='dewi' special={true} /> Dewi, <span className='text text-small text-champagne'>La Flamboyante !</span> <DurationPriceBadges duration="45" price="45" /> <span className="text text-or">ou</span> <DurationPriceBadges duration="30" price="35" /></h2>
            <p className='text text-dark'>Très populaire dans les salons de coiffure à Java et Bali, cet authentique trésor de beauté se focalise sur le cuir chevelu et débute par l’application d’un soin capillaire. Ce massage crânien tonique et relaxant prévient la perte de cheveux. Durant le temps de pose du masque, ce soin revitalisant s’accompagne d’un massage de la nuque, du dos, des bras et des mains.</p>
            <p className="text text-peps">Effet décoiffant garanti !</p>
            <p className='text text-dark'>Masque au beurre de karité, huile de jojoba et huile de ricin (tous les produits sont issus de l’agriculture biologique, 100% purs et naturels).</p>
            <p className='text text-dark'>Massage pratiqué sur fauteuil. Possibilité de déplacement à domicile sur le secteur de Josselin - Ploërmel.</p>
            <button 
              className='button-normal'
              onClick={this.contact}  
              value='Dewi'
            >
              Chouchoute ma chevelure
            </button>
          </div>
        </div>

        <div id='gift-card' className='row part-dark'>
          <Title content='Carte cadeau' />

          <div className='col-sm-5'>
            <img className='img-full img-rounded' src={offer} alt="carte cadeau"  />
          </div>  
          <div className='col-sm-7'>
            <h3 className='title title-sub title-peps-big'>Noël, anniversaire,<br/> fête des mères...</h3>
            <p className='text text-semi-dark'>
            ...ou simplement pour faire plaisir à votre amie qui a besoin de se détendre ! Il vous suffit de cliquer sur le bouton ci-dessous 👇 en précisant le massage à offrir ainsi que la personne à chouchouter !<br/><br/>Vous recevrez ensuite votre carte cadeau par email avec un code à transmettre le jour du massage.<br/><br/>Carte cadeau valable pendant un an !
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
          <Title content='Contact' />

          <div className='col-sm-4'>
            <p className='text text-semi-dark'>📅 <b className='text-dark'>Horaires</b> Tous les jours de 9:30-17:30 sauf les mercredis et dimanches</p>
            <p className='text text-semi-dark'>📞 <b className='text-dark'>Téléphone</b> +336 52.18.72.92</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113000.12262653657!2d-2.638221624133621!3d47.94937656049811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480fce17bda0ea73%3A0x307cad350f181d40!2s56120%20Josselin!5e0!3m2!1sfr!2sfr!4v1631771705879!5m2!1sfr!2sfr"></iframe>
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
    );
  }
}

const yieldNode = document.querySelector("#yield");

ReactDOM.render(
  <Chouchoute />,
  yieldNode
);