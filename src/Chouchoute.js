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
import img1 from './assets/images/sample-1.jpg';
import img2 from './assets/images/sample-2.jpg';
import img3 from './assets/images/sample-3.jpg';
import img4 from './assets/images/sample-4.jpg';
import img5 from './assets/images/sample-5.jpg';
import img6 from './assets/images/sample-6.jpg';
import img7 from './assets/images/sample-7.jpg';
import img8 from './assets/images/sample-8.jpg';
import img9 from './assets/images/sample-9.jpg';
import img10 from './assets/images/sample-10.jpg';
import offer from './assets/images/offer-old.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/stylesheets/fonts.scss';
import 'assets/stylesheets/style.scss';
import '../node_modules/slick-carousel/slick/slick.css'; 
import '../node_modules/slick-carousel/slick/slick-theme.css';

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
    let text = `<@flo> Formulaire de contact\n\nMessage de ${name}\n:email: ${email}\n:phone: ${phone}\n\n${messageContent}`;

    return (
      JSON.stringify(
        {
          "text": text
        }
      )
    );
  }
  
  send() {
    axios.post(
      "https://hooks.slack.com/services/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", 
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
      message: `Salut Flo, je suis intéressée par le massage ${massage} !\nPeux-tu me recontacter très vite !`
    });

    scrollIntoView(node, {
      block: 'center',
      behavior: 'smooth'
    });
  }

  offer() {
    const node = document.getElementById('contact');

    this.setState({
      message: `Salut Flo, j'aimerais offrir un moment de détente !\nPeux-tu me recontacter très vite !`
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
            <img className='img-line-item' src={img8} />
            <img className='img-line-item' src={img2} />
            <img className='img-line-item' src={img3} />
            <img className='img-line-item' src={img9} />
            <img className='img-line-item' src={img10} />
          </Slider>
        </div>

        <div id='chouchoute' className='row part'>
          <div className='col-sm-12 part-title'>
            <h2 className='title title-champagne'>Chouchoute<br/><div className='title-deco'/></h2>
          </div>

          <div className='col-sm-12'>
            <p className='text text-semi-dark'>On vous a peut-être offert en cadeau un massage ou bien vous avez réussi à faire garder vos enfant quelques heure pour enfin penser à vous ?<br/>Quel chance !<br/>Vous allez voir, le massage agit de façon positive sur nos émotions, c’est vraiment magique !<br/>Il favorise la confiance et le sentiment de réconfort, qui invitent à la détente et à un véritable moment de bien-être.<br/>Je pratique un massage exotique qui en plus de vous détendre va vous faire voyager, il provient d’une partie du monde très lointaine, surnommée « l’île des dieux » !<br/>Ce nom fais rêver, n’est ce pas ?  Mais c’est où ?<br/>À Bali !<br/>Ici, comme encore à Java ou Lombok, la culture du massage est ancrée au cœur de toute les familles indonésiennes. C’est même un art de vivre ancestrale apprécié pour son équilibre exceptionnel. L’association de la médecine ayurvédique (la science indienne du corps et de l’esprit) ; la médecine énergétique chinoise et les techniques indonésiennes locales lui confère un intérêt unique. Il offre au corps apaisement et revitalisation grâce à ses mouvements toniques mais profonds !<br/>Le massage balinais a tout d'une danse au rythme lent qui offrira une profonde et durable relaxation à votre corps... et à votre esprit !<br/>Je vous propose ainsi un accompagnement bienveillant, et vous accorde toute mon attention durant un échange qui me permettra dévaluer vos besoins durant le massage.<br/>Au plaisir de vous chouchouter !</p>
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
            <p className='text text-semi-dark'>Salut les filles, moi c’est Flo ! J’aime le contact humain, bavarder, rigoler, prendre le temps de vous chouchouter et tout ça dans une ambiance cosy! Pourtant...</p>
            <p className='text text-semi-dark'>Petit retour en arrière, nous sommes en 2016 quand mon adorable chéri m’organise un voyage surprise en Thaïlande ! Cela faisait un bout de temps que je voulais visiter l’Asie, découvrir sa culture, sa cuisine, son sourire mais surtout... ses massages !</p>
            <p className='text text-semi-dark'>Quelques jours après notre arrivée c'est donc tout naturellement qu'au détour d'une petite rue de Chiang-Mai, nous avons tentez à l'improviste un salon de massage et ce fut un véritable... calvaire ! </p>
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
              Chouchoutte mon corps | 50€
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
              Chouchoutte ma ligne | 60€
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
              Chouchoutte intégral | 80€
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
              Chouchoutte ma chevelure | 50€
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
              Chouchoutte mon visage d'ange | 50€
            </button>
          </div>
        </div>

        <div id='gift-card' className='row part'>
          <div className='col-sm-12 part-title'>
            <h2 className='title title-champagne'>Carte cadeau<br/><div className='title-deco'/></h2>
          </div>

          <div className='col-sm-5'>
          <img className='img-full' src={offer} />
          </div>  
          <div className='col-sm-7'>

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
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10749.887751408041!2d-2.738819!3d47.6558276!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9b66e6986c6242f4!2sChouchoute%20by%20Flo!5e0!3m2!1sfr!2sfr!4v1577022978684!5m2!1sfr!2sfr"></iframe>
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