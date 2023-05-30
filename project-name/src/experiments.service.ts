
import { Injectable,Session} from '@nestjs/common';


@Injectable()
export class ExperimentService {
    
    setAktiveUser(boolean :boolean,session){
        if(boolean){
            this.getExperiment(session);
        }
        session.experiments = boolean;
    }

    ifOldUser(session){
        if(session.experiment == null){
            session.experiment = false;
        }
    }

    getExperiment(session){
        if(session.experiments == null){
            session.experiments = true;
            let random = this.getRandomInt(3);
            if(random === 0){
                session.button_color = "#FF0000";
            }else if(random === 1){
                session.button_color = "#00FF00";
            }else{
                session.button_color = "#0000FF";
            }

            random = this.getRandomInt(100);
            if(random < 75){
                session.price = 10;
            }else if(random < 85){
                session.price = 20
            }else if(random < 90){
                session.price = 50;
            }else{
                session.price = 5;
            }
        }
        if(session.experiments == false){
            return {
                experiment: "the user is not a participant in the experiment"
            }
        }
        return {
            experiment: {
                price:session.price,
                color:session.button_color
            }
        };
    }

    private getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

}