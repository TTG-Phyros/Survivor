import React, { useState, useEffect } from "react";
import "./astro-test.css";
import { useNavigate } from 'react-router';
import * as api from './api/Api.js'

const AstroTest: React.FC = () => {
  const [selectedCustomer1, setSelectedCustomer1] = useState<number | null>(null);
  const [selectedCustomer2, setSelectedCustomer2] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [customersInfo, setCustomersInfo] = useState([
    {
        id: 0,
        firstname: '',
        lastname: '',
        email: '',
        phone_number: '',
        astrological_sign: ''
    }
  ]);

  const compatibilityData: { [key: string]: string } = {
    "Bélier&Bélier": "65% Bélier & Bélier : Tout va bien entre 2 Béliers, même si leur entêtement mutuel peut leur jouer des tours. Attention de bien ménager les égos de tout le monde.",
    "Bélier&Taureau": "50% Bélier & Taureau : Ça dépend des jours avec ces 2 là. Le Bélier est toujours dans l’action et ça fatigue un peu le Taureau qui aime bien prendre du bon temps sans calculer sa productivité.",
    "Bélier&Gémeaux": "70% Bélier & Gémeaux : Le Bélier et le Gémeaux partagent une curiosité forte pour le monde qui les entoure. Les débats entre ces 2 là seront toujours riches, bien que parfois un peu agités !",
    "Bélier&Cancer": "10% Bélier & Cancer : Il existe une sensibilité très différente entre le Bélier et le Cancer. Pas simple de s’apprivoiser. Si le Bélier veut que ça marche, il va devoir apprendre la patience et le tact !",
    "Bélier&Lion": "90% Bélier & Lion : Bélier et Lion, vous êtes faits pour aller ensemble. Avec traits de caractères forts, notamment au niveau de la détermination et de l’esprit d’entreprendre, vous formez un couple que rien n’arrête.",
    "Bélier&Vierge": "35% Bélier & Vierge : Entre le Bélier et la Vierge, le début de relation peut être un peu chaotique, chacun ayant sa vision des choses et sa façon de faire. Mais s’ils arrivent à accorder leur violon, ça peut marcher.",
    "Bélier&Balance": "75% Bélier & Balance : Pas forcément ceux qui se ressemblent le plus niveau caractère, mais la complémentarité est plus que bonne. Le Bélier et la Balance formeront un couple moderne et très agréable à fréquenter.",
    "Bélier&Scorpion": "40% Bélier & Scorpion : 2 caractères très forts, peut-être trop forts pour que ça fonctionne parfaitement. Pour que ça marche entre ces 2 là, il faudra qu’ils travaillent bien leur self-control !",
    "Bélier&Sagittaire": "80% Bélier & Sagittaire : Le Bélier et le Sagittaire n’ont peur de rien ! Ensemble, ils partiront à la conquête de leur monde ! Le Bélier aurait-il trouvé son compagnon ou sa compagne parfait(e) pour l’aventure ?",
    "Bélier&Capricorne": "65% Bélier & Capricorne : Entre le Bélier et le Capricorne, le cocktail peut être intéressant notamment entre le côté fonceur du Bélier et la logique du Capricorne. S’ils partagent une ambition commune, rien ne leur sera impossible.",
    "Bélier&Verseau": "100% Bélier & Verseau : Les chances que ça marche entre Bélier et le Verseau sont plus qu’élevées. Ils se complètent parfaitement. Ils sont animés de la même force de vie et se comprendront parfaitement !",
    "Bélier&Poisson": "25% Bélier & Poisson : Entre le Bélier et le Poisson, il y a une forme d’incompréhension au naturel. Ils ont une vision très différente de la vie et de son fonctionnement. S’ils arrivent à faire comprendre leur univers l’un à l’autre, une relation forte peut se créer.",
    "Taureau&Bélier": "50% Taureau & Bélier : Pas toujours évident d’être sur le même rythme pour ces 2 là. Mais s’ils apprennent à s’apprivoiser l’un et l’autre, ils pourront fonctionner sur courant alternatif.",
    "Taureau&Taureau": "70% Taureau & Taureau : Les Taureaux partagent tous les 2, la même passion pour les bonnes choses de la vie. Mais leur union peut manquer un peu de discipline. Attention aux excès dans ce couple.",
    "Taureau&Gémeaux": "20% Taureau & Gémeaux : Le Taureau et le Gémeaux n’ont pas forcément la même vision de la vie. Il y a notamment une différence de point de vue sur le matériel et le confort. Le Gémeaux vit d’eau fraîche et d’amour. Pour le Taureau, il faudra plus que de l’eau fraîche.",
    "Taureau&Cancer": "100% Taureau & Cancer : Taureau et Cancer s’apportent mutuellement ce dont chacun à besoin. Parmi l’ensemble des couples du Zodiaque, c’est surement ceux qui veillent le mieux l’un sur l’autre.",
    "Taureau&Lion": "55% Taureau & Lion : 2 caractères forts, qui ont tous les 2 un profil de leader. Forcément, pas toujours évident quand les ordres sont contraires. Il faudra qu’ils apprennent à s’écouter et à se faire confiance pour que ça marche.",
    "Taureau&Vierge": "80% Taureau & Vierge : Le Taureau et la Vierge s’entendent à la perfection. Il faut dire qu’ils se comprennent souvent très bien, car ils partagent des valeurs communes. Ça devrait donc plus que bien marcher entre ces 2 là.",
    "Taureau&Balance": "45% Taureau & Balance : Pour le Taureau et la Balance la vision de la vie peut être différente. Pour autant ça ne les empêche pas de vivre ensemble et de s’apprécier. Mais chacun devra cultiver son jardin secret pour ne pas se sentir prisonnier de son couple.",
    "Taureau&Scorpion": "75% Taureau & Scorpion : Le Taureau et le Scorpion se comprennent très bien. Ils sont très différents au niveau du caractère, mais ces 2 signes ont un niveau de lecture supérieur à la moyenne. Ils arrivent à se comprendre naturellement, sans forcément avoir besoin de mot. Leur échange de regard est très puissant. Des ingrédients parfaits pour créer une relation amoureuse forte.",
    "Taureau&Sagittaire": "30% Taureau & Sagittaire : Le Sagittaire et le Taureau sont parfois plus centrés sur leurs propres besoins que sur les besoins de l’autre. Il faudra donc un véritable altruisme de la part de chacun pour que la relation fonctionne entre les 2.",
    "Taureau&Capricorne": "65% Taureau & Capricorne : Les personnalités du Taureau et de Capricorne peuvent se séduire mutuellement. Chacun de ces signes possède de l’admiration pour les traits de caractère de l’autre signe. Par contre, ils ont plus de mal à accepter les défauts de l’autre. Il faudra faire preuve de plus de tolérance que d’habitude.",
    "Taureau&Verseau": "15% Taureau & Verseau : Entre le Taureau et le Verseau ça ne commence pas toujours bien. Même les premières rencontres peuvent être assez électriques. Ils peuvent longtemps s’opposer l’un à l’autre et pour ainsi dire être les meilleurs ennemis du monde. Mais on le sait, entre haine et amour, il n’y a qu’un seul pas.",
    "Taureau&Poisson": "90% Taureau & Poisson : Le couple Taureau et Poisson est fait pour exister dans la durée. Les personnalités de ces signes ont tous les atouts pour cultiver ensemble une relation de couple, qui même si elle peut avoir des petites turbulences, s’installe parfaitement dans la durée.",
    "Gémeaux&Bélier": "70% Gémeaux & Bélier : Le Gémeaux et le Bélier forment un couple dynamique et entreprenant. Ils se motivent et se soutiennent l’un et l’autre dans toutes les épreuves. Un couple solide et capable de surmonter ensemble les épreuves de la vie.",
    "Gémeaux&Taureau": "20% Gémeaux & Taureau : On a ici 2 forts caractères mais avec un tempérament différent. C’est donc parfois compliqué pour chacun de s’aligner sur les désirs et les besoins de l’autre. Il faudra faire des efforts pour que ça marche.",
    "Gémeaux&Gémeaux": "80% Gémeaux & Gémeaux : 2 Gémeaux ensemble, c’est l’aventure ! Accrochez-vous, car ça risque d’être mouvementé ! Ils partagent le même entrain et le même enthousiasme pour les nouvelles expériences. Un couple qui manque peut-être parfois un peu de maturité dans certaines situations.",
    "Gémeaux&Cancer": "10% Gémeaux & Cancer : Le Gémeaux et le Cancer, c’est loin d’être une évidence. Les besoins émotionnels sont très différents et ça sera compliqué de s’adapter à l’autre sur ce point. Mais à force de patience et de tolérance, l’apprentissage de l’autre se fera et la relation pourra se construire.",
    "Gémeaux&Lion": "100% Gémeaux & Lion : Le Gémeaux et le Lion c’est l’amour passionnel. Un couple animé par une flamme brulante et inextinguible. Cette passion fera des jaloux, mais ça ne les empêchera pas de vivre à fond leurs émotions.",
    "Gémeaux&Vierge": "15% Gémeaux & Vierge : Le Gémeaux et la Vierge n’ont pas forcément le même sens moral. Ça peut être une source d’incompréhension entre ces deux là. S’ils font preuve de pédagogie et de patience, ils pourront surmonter ces différences de sens et créer leur propre code.",
    "Gémeaux&Balance": "80% Gémeaux & Balance : Ces 2 là partagent le goût pour la fête et les festivités. Ils aiment tous les 2 partager des bons moments ensemble ou avec leurs amis. Et quand la fête est finie, ils aiment aussi se retrouver dans l’intimité du couple pour exprimer leur amour.",
    "Gémeaux&Scorpion": "20% Gémeaux & Scorpion : Le Gémeaux manque parfois de patience avec le Scorpion. On a d’un côté un hyperactif de la vie, avec qui ça doit aller vite, et de l’autre un être spirituel qui prend son temps pour réfléchir et agir de la bonne façon. Des tensions peuvent donc naître, mais s’ils arrivent à les surmonter, ils formeront une équipe de choc.",
    "Gémeaux&Sagittaire": "75% Gémeaux & Sagittaire : Le Gémeaux et le Sagittaire forment un couple plein de vie. Ils partagent le goût pour l’aventure et se poussent mutuellement à exprimer leurs talents. Ils manquent parfois un peu de discipline tous les 2, mais compensent par leur soif de réussite !",
    "Gémeaux&Capricorne": "50% Gémeaux & Capricorne : Le Gémeaux et le Capricorne sont différents, notamment au niveau de la rigueur. Ils sont tous les 2 créatifs, mais avec des profils opposés. Le Gémeaux est très libre dans sa créativité alors que le Capricorne cherche à l’organiser de façon logique. Ils peuvent donc avoir des avis très opposés sur certaines choses. À eux de composer avec !",
    "Gémeaux&Verseau": "80% Gémeaux & Verseau : Gémeaux et Verseau sont un beau couple. Ils savent tous les 2 exprimer leurs émotions de manière simple. Avec eux, les disputes et les tensions ne durent pas très longtemps et l’amour triomphe toujours. Un couple charmant et intéressant qu’on aime avoir pour amis.",
    "Gémeaux&Poisson": "30% Gémeaux & Poisson : 2 esprits créatifs mais 2 fonctionnements de création complètement différents. Pour le Gémeaux, les idées doivent être concrètes et constructives. Le Poisson est plus dans l’abstrait et l’artistique, les idées servent à exprimer quelque chose sans qu’elles aient besoin de sens. Forcément pas toujours simple de se comprendre.",
    "Cancer&Bélier": "10% Cancer & Bélier : Cancer et Bélier vivent sur un rythme bien différent. Du coup, il leur faudra une sacrée organisation et une bonne flexibilité pour se supporter l’un et l’autre. Mais en amour, rien n’est impossible !",
    "Cancer&Taureau": "100% Cancer & Taureau : Le Cancer et le Taureau vivent un amour pur et très fort. Le couple qu’ils forment est une évidence tant ils se complètent parfaitement. Leur force, c’est qu’ils connaissent parfaitement les besoins de l’autre et possèdent les qualités nécessaires pour répondre à ces besoins.",
    "Cancer&Gémeaux": "10% Cancer & Gémeaux : Là où ça coince entre ces 2 là, c’est surtout niveau communication. Ils ont chacun leur façon de faire passer leurs émotions et leurs sentiments. Et ces façons sont très singulières. La naissance de sentiment amoureux dépendra donc de la capacité à écouter l’autre et de l’accepter pour qui cette personne est vraiment.",
    "Cancer&Cancer": "70% Cancer & Cancer : 2 Cancer ensemble se comprendront parfaitement. Ils formeront naturellement un couple uni qui fait preuve de beaucoup d’empathie l’un envers l’autre. Ils mettront pourtant un peu de temps avant de prendre des décisions importantes pour l’évolution de leur couple.",
    "Cancer&Lion": "20% Cancer & Lion : Comme souvent avec le Cancer, ça fonctionne du premier coup ou pas. Avec le Lion, la première rencontre peut être déstabilisante tant leur façon d’appréhender le monde est différente. Mais, passé la première impression, les 2 personnalités peuvent très bien se séduire avec le temps.",
    "Cancer&Vierge": "80% Cancer & Vierge : Le Cancer et la Vierge partagent des repères et des valeurs communes. C’est un atout dans la construction de leur couple et de leur vie sentimentale. Attention néanmoins, la domination naturelle de la Vierge qui peut créer des tensions dans le couple.",
    "Cancer&Balance": "30% Cancer & Balance : La plus grande différence entre le Cancer et la Balance, c’est généralement leur style de vie. Forcément sur le long terme, ça peut être compliqué à conjuguer. Il faudra que le Cancer et la Balance soient tous les 2 de nature curieuse, suffisamment pour s’intéresser aux univers de chacun d’eux.",
    "Cancer&Scorpion": "70% Cancer & Scorpion : Ce couple est sûrement le couple de l’astrologie qui partage la meilleure complicité. Les esprits du Cancer et du Scorpion sont faits pour s’entendre. Les traits de caractères de chacun sont pourtant bien différents, mais s’ils se laissent une chance d’échanger, ils découvriront chacun le complice parfait pour réaliser les 400 coups.",
    "Cancer&Sagittaire": "15% Cancer & Sagittaire : Dans ce couple, les besoins émotionnels sont très importants d’un côté comme de l’autre. L’égoïsme naturel de chacun peut donc être un frein conséquent à la réussite de ce couple, sauf si les 2 partenaires font preuve de bienveillance et de générosité l’un envers l’autre.",
    "Cancer&Capricorne": "70% Cancer & Capricorne : Le Cancer et le Capricorne forment une équipe qui se complète. Les forces de l’un compensent les faiblesses de l’autre. Le Cancer sera le côté émotionnel et créatif de ce couple. Le Capricorne apporte lui le côté rationnel et organisationnel. Ensemble ils construiront une vie équilibrée et belle.",
    "Cancer&Verseau": "20% Cancer & Verseau : Entre le Cancer et le Verseau, ça bloque un peu. Il faut dire qu’un des 2 aime bien monopoliser l’attention et la parole (on ne dira pas lequel). Pour que ça marche, ils devront s’écouter l’un l’autre et se porter attention.",
    "Cancer&Poisson": "100% Cancer & Poisson : Le couple le plus créatif du zodiac. La combinaison de ces 2 là est à l’origine d’une histoire d’amour passionnelle et romantique. Attention à l’excès de passion, certaines histoires d’amour peuvent virer au drame avec ces 2 personnalités.",
    "Lion&Bélier": "90% Lion & Bélier : Cocktail explosif ! L’union du Lion et du Bélier est loin d’être anecdotique ! Ces 2 là forment un couple dynamique, surprenant et heureux. Incroyable que 2 forces de caractère aussi importantes arrivent à s’entendre de cette façon !",
    "Lion&Taureau": "55% Lion & Taureau : Le Lion et le Taureau ont des visions similaires notamment sur le rôle des valeurs et la place de la famille dans une vie épanouie. Ils peuvent cependant avoir des modes de vies et des envies très différentes. À eux d’accorder leur violon pour que tout se passe bien.",
    "Lion&Gémeaux": "100% Lion & Gémeaux : Entre le Lion et le Gémeaux, c’est l’amour fou. Ils s’admirent mutuellement et vont parfaitement ensemble. Plus étonnant, les couples placés sous ces signes vivent un véritable coup de foudre lors de la première fois où ils se rencontrent. Est-ce votre cas ?",
    "Lion&Cancer": "20% Lion & Cancer : Le Lion et le Cancer ont des états d’esprit et surtout des états d’âme différents. Dans ce couple, il y a un déséquilibre concernant le besoin d’attention. Si un des deux arrive à le compenser, ça peut très bien marcher, mais il faudra que l’autre sache renvoyer la balle de temps en temps.",
    "Lion&Lion": "85% Lion & Lion : 2 rois dans une même jungle, ce n’est pas forcément ce qu’il y a de mieux pour gouverner. Mais les Lions sont des créatures intelligentes qui savent s’adapter. Un couple de Lion se comprendra parfaitement même si de temps en temps, il peut y avoir quelques petites luttes pour prendre le pouvoir.",
    "Lion&Vierge": "40% Lion & Vierge : Pour que ça marche entre le Lion et la Vierge, il faudra que ces 2 là apprennent à lâcher prise. Ils désirent tous les 2 prendre le leadership, même dans les situations où ils ne sont pas les mieux placés pour guider. S’ils se reposent mutuellement sur les forces de l’un et de l’autre, ils formeront une équipe du tonnerre. Sinon, gare aux tempêtes !",
    "Lion&Balance": "85% Lion & Balance : Le couple le plus glamour du Zodiaque ! Le Lion et la Balance forment un couple fait pour le monde. Le couple qui inspire les autres couples par son élégance et sa complicité. En plus, ils arrivent tous les 2 à garder leur indépendance. Un couple qui donne envie d’être amoureux !",
    "Lion&Scorpion": "20% Lion & Scorpion : Quand l’action rencontre la pensée abstraite, ça peut laisser perplexe. Du coup, lors de leur première rencontre les sentiments entre le Lion et le Scorpion peuvent être partagés entre l’incompréhension et la curiosité. À eux de se construire et de se dévoiler au bon rythme pour enfin former un vrai couple. Attention à ne pas rester bloqué dans les jeux de séduction !",
    "Lion&Sagittaire": "75% Lion & Sagittaire : Le Lion et le Sagittaire forment un couple fort et charismatique. Leurs discussions et débats sont toujours très animés et ils ne sont pas à l’abri de trouver de bonnes idées ensemble. À eux ensuite de les réaliser en s’appuyant sur leur amour.",
    "Lion&Capricorne": "60% Lion & Capricorne : Le Lion et le Capricorne forment un couple inattendu. Généralement, on ne les voit pas vraiment ensemble avant leur rencontre. Mais quand ils se mettent en couple, on comprend mieux pourquoi ils sont ensemble. La période entre la rencontre et le passage à la vie de couple peut tout de même être un peu compliquée à gérer pour ces caractères très différents.",
    "Lion&Verseau": "80% Lion & Verseau : Sur le papier ce couple a tout pour réussir la vie qu’ils entreprendront ensemble. Ils partagent le même dynamisme et les mêmes ambitions. Mais dans la réalité, les égos peuvent parfois fragiliser leur relation. S’ils arrivent à s’écouter et qu’ils n’ont pas peur de se dire les choses comme ils le ressentent, alors ils surmonteront les petites épreuves, pour vivre ensemble des moments heureux.",
    "Lion&Poisson": "15% Lion & Poisson : Il est rare que le Lion et le Poisson partagent le même Univers. C’est même plutôt le contraire. Ils évoluent chacun dans leur propre monde et la rencontre entre ces 2 là peut donner lieu à des situations cocasses. À eux d’utiliser cette force inattendue pour construire un couple surprenant mais attachant !",
    "Vierge&Bélier": "35% Vierge & Bélier : Difficile pour la Vierge et le Bélier d’avancer toujours dans le même sens. Ils suivent généralement chacun leur voie. Pour que ça marche, il faudra que leur chemin mène vers la même destination.",
    "Vierge&Taureau": "80% Vierge & Taureau : La Vierge et Taureau partagent la même vision de la vie. La famille a une place très importante pour ces 2 là. Mais il y aura peut-être une vision différente sur l’éducation des enfants. À suivre !",
    "Vierge&Gémeaux": "15% Vierge & Gémeaux : La Vierge et le Gémeaux ont des tempéraments très différents. Alors que l’un est plus dans l’observation et la réflexion, l’autre sera plus dans l’action et la pensée libre. À eux de s’apprivoiser et d’apprendre à aimer les traits de personnalité différents de ce qu’ils connaissent.",
    "Vierge&Cancer": "80% Vierge & Cancer : La Vierge et le Cancer ont des caractères qui se complètent parfaitement. Ils sont tous les 2 de nature attentionnée avec pourtant un rapport à l’autorité très différents. Ils ont le potentiel pour vivre une belle histoire, s’ils arrivent à ne pas prendre trop à cœur les conflits qu’ils rencontreront.",
    "Vierge&Lion": "40% Vierge & Lion : Entre la Vierge et le Lion, c’est la séduction qui fera la différence. De base, ces 2 là ne se laissent pas facilement séduire. Du coup, il faudra qu’il y ait une véritable attirance lors de leur rencontre pour qu’une histoire puisse se créer entre eux.",
    "Vierge&Vierge": "90% Vierge & Vierge : Entre une Vierge et une autre, la vie de couple est réglée comme du papier à musique. Un couple bien dans sa vie, organisée et avec qui on aime passer du temps. Ils formeront une belle famille, heureuse et solide.",
    "Vierge&Balance": "25% Vierge & Balance : Une organisation bien différente entre la Vierge et la Balance. Ces 2 là suivent des règles qui leur sont propres. Forcément s’ils ne partagent pas de règles communes, ça aura du mal à marcher. Mais avec de la patience et de la pédagogie, tout est possible.",
    "Vierge&Scorpion": "85% Vierge & Scorpion : La Vierge et le Scorpion ont un fort potentiel de compatibilité. Le jeu de séduction entre ces 2 là n’est pas orthodoxe, mais créera justement une sorte de magie dans la rencontre. Un fort potentiel pour voir naître une belle et longue histoire d’amour.",
    "Vierge&Sagittaire": "10% Vierge & Sagittaire : Attention aux égos entre ces 2 là. Ils sont souvent surdimensionnés chez ces signes du zodiac. Mais c’est aussi ce qui fait leur charme. Le début de relation peut être un peu chaotique, jusqu’à ce que l’attachement se mette en place. Le plus drôle, c’est que si ça marche, ils seront inséparables.",
    "Vierge&Capricorne": "100% Vierge & Capricorne : La relation parfaite pour ces 2 signes de l’astrologie. La Vierge et le Capricorne se comprennent, s’encouragent et se poussent à se dépasser. Ils construiront ensemble une belle vie, solide et ambitieuse. Ils partagent la même rigueur et le même goût pour le travail bien fait.",
    "Vierge&Verseau": "35% Vierge & Verseau : À part la lettre V au début de leur signe, la Vierge et le Verseau n’ont pas grand-chose en commun. Le souci majeur, c’est l’organisation. Ils ont un système de pensée tellement différent que ça sera compliqué. Compliqué, mais pas impossible. Ces 2 là ont du cœur, et peuvent changer leur habitude par amour.",
    "Vierge&Poisson": "85% Vierge & Poisson : L’organisation au service de la créativité. La Vierge et le Poisson se séduisent et se complètent. Un couple qui sait utiliser les forces de chacun pour construire une vie équilibrée et pleine d’amour.",
    "Balance&Bélier": "75% Balance & Bélier : Balance et Bélier forment un couple détonnant. Ils se séduisent mutuellement. Ils sont complémentaires, la combinaison du tact et de l’audace, de quoi soulever des montagnes.",
    "Balance&Taureau": "45% Balance & Taureau : La vie de couple n’est pas toujours évidente, notamment lorsqu’ils ont des envies différentes. Ils peuvent en effet avoir des visions différentes, alors que l’un voudra sortir et voir du monde, l’autre préférera rester à la maison et cocooner. À chacun de faire les efforts qu’il faut, de façon alternée, pour faire plaisir à l’autre.",
    "Balance&Gémeaux": "80% Balance & Gémeaux : La Balance et Gémeaux partagent l’esprit de curiosité et la soif de découverte. Ils sont également tous les deux à l’aise avec le monde et aiment débattre et discuter. Ils passeront ensemble des nuits entières à refaire le monde.",
    "Balance&Cancer": "30% Balance & Cancer : Entre la Balance et le Cancer, ça dépend des jours. Ils ont chacun leur caractère et c’est leur état d’âme. Il faudra donc parfois faire preuve d’ouverture d’esprit et prendre sur soi quand l’autre traverse une phase compliquée.",
    "Balance&Lion": "85% Balance & Lion : Balance et Lion sont fait pour s’entendre ! Le couple le plus glamour du zodiaque. Ils ont tous les 2 des personnalités brillantes et séduisantes qui attirent les regards sur eux. Attention cependant à la jalousie qui peut naître facilement au sein de ce couple.",
    "Balance&Vierge": "25% Balance & Vierge : Balance et Vierge ont une approche complétement différente de la vie et notamment des relations sociales. La Balance sera très extravertie alors que la Vierge sera plus sur la réserve. À chacun de s’adapter à l’autre pour mieux le comprendre et l’accepter comme il ou elle est.",
    "Balance&Balance": "70% Balance & Balance : 2 Balance ensemble, c’est la garantie de vivre une vie de couple amusante et légère. Ça manque pourtant parfois un peu de sérieux et il peut y avoir également quelques problèmes d’égo. Mais dans l’ensemble ça devrait bien se passer.",
    "Balance&Scorpion": "15% Balance & Scorpion : Balance et Scorpion ont des personnalités diamétralement opposées. Ça ne les empêche pas de se séduire, mais le début de la vie de couple peut être parfois un peu compliqué. Le poison de ce couple c’est la jalousie, attention à ne pas y succomber.",
    "Balance&Sagittaire": "85% Balance & Sagittaire : Il y a une bonne entente entre la Balance et le Sagittaire. Généralement ces deux là sont d’abord amis avant de devenir amant. Avec eux, on ne s’ennuie jamais et tant mieux, car l’un comme l’autre, ils détestent s’ennuyer.",
    "Balance&Capricorne": "20% Balance & Capricorne : Difficile pour la Balance et le Capricorne de trouver des terrains d’entente. Ils offrent chacun une forte résistance à l’autre lorsqu’ils ne sont pas d’accord sur un point. Pas simple pour le coup de sortir d’un conflit. Mais l’amour permet de changer les avis des plus têtus.",
    "Balance&Verseau": "80% Balance & Verseau : La Balance et le Verseau sont tous les 2 des originaux. Ils se fascinent et s’attirent donc assez naturellement. Mais les différences d’idéologie peuvent parfois créer quelques tensions au sein de leur couple. Il faudra donc savoir rester ouvert aux débats et aux discussions pour que ça marche.",
    "Balance&Poisson": "40% Balance & Poisson : La Balance et le Poisson se comprennent, pourtant ils n’ont pas la même vision. Il y a toujours un certain déséquilibre émotionnel entre ces 2 là. Avec le temps et avec les efforts, ils arriveront à mieux équilibrer leur relation et vivre une belle histoire amour.",
    "Scorpion&Bélier": "40% Scorpion & Bélier : Le Scorpion et le Bélier ont parfois du mal à se comprendre. C’est surtout dans l’attitude qu’il y a des incompréhensions. Des tempéraments différents mais pas forcément incompatibles. Il leur faudra juste faire preuve de patience.",
    "Scorpion&Taureau": "75% Scorpion & Taureau : Le Scorpion et le Taureau s’entendent très bien. Même si la construction de leur relation peut prendre du temps, celle-ci sera solide et les mènera loin. Attention à ne pas perdre la communication, ces 2 là ont parfois du mal à se livrer sur leur sentiment.",
    "Scorpion&Gémeaux": "20% Scorpion & Gémeaux : Le problème majeur entre le Gémeaux et le Scorpion, c’est la communication. D’un côté, on a une personnalité Gémeaux très expansive et un peu bavarde, de l’autre une personnalité Scorpion plus introvertie et plus secrète. Il faudra donc que chacun s’adapte à l’autre.",
    "Scorpion&Cancer": "70% Scorpion & Cancer : Le Cancer et le Scorpion se comprennent. Ils font preuve à l’égard de beaucoup d’attention. Leur relation est assez transcendante. Pas besoin de beaucoup de mots pour se comprendre, les gestes suffisent.",
    "Scorpion&Lion": "20% Scorpion & Lion : Entre le Scorpion et le Lion, le choc peut être assez frontal. C’est deux là vont faire des étincelles lors de leur rencontre. Les choses ne seront pas forcément bien engagées dans un premier temps, mais on n’est jamais à l’abri d’un coup de cœur inattendu.",
    "Scorpion&Vierge": "85% Scorpion & Vierge : Vierge et Scorpion forment un couple assez étonnant. Le Scorpion est surement le signe qui est le plus à même de faire tomber la vigilance de la Vierge et de lui faire perdre la tête. La Vierge de son côté apporte dans la vie du Scorpion un sens que celui-ci cherche depuis longtemps. Un très beau couple du Zodiaque !",
    "Scorpion&Balance": "15% Scorpion & Balance : Scorpion et Balance une approche bien différente des interactions et comportements avec le monde extérieur. Pour autant, cela ne signifie pas qu’ils ne pourront pas s’entendre dans l’intimité. Encore une fois, la communication sera la clé du succès ou non pour leur relation.",
    "Scorpion&Scorpion": "80% Scorpion & Scorpion : 2 Scorpion ensemble, ça peut paraître risqué comme mélange. Pourtant c’est une bonne combinaison. Ils se comprennent bien et arrivent à se dévoiler dans l’intimité. Attention cependant au non-dit et aux secrets. Les scorpions doivent apprendre à se faire confiance pour que ça marche.",
    "Scorpion&Sagittaire": "20% Scorpion & Sagittaire : Entre le Scorpion et le Sagittaire, ça manque un peu de chaleur (du moins au début). Ils se méfient l’un de l’autre et ont donc tendance à garder dans un premier temps leur distance. Mais les jeux de séduction peuvent faire monter la chaleur et un couple d’amoureux peut naître de cette combinaison.",
    "Scorpion&Capricorne": "80% Scorpion & Capricorne : Des personnalités très différentes mais qui se complètent bien. Le Capricorne est une des personnalités du zodiaque qui arrive à cerner le Scorpion (ce qui peut d’ailleurs beaucoup troubler le Scorpion). Plus simple alors pour eux de se comprendre, de s’apprécier et pourquoi pas de s’aimer.",
    "Scorpion&Verseau": "30% Scorpion & Verseau : Le Scorpion et le Verseau ont une vision qui leur est propre. Ils ont chacun leurs habitudes et leur propre système de valeur. Quand leur vision est commune, ça marche, mais quand elle est trop différente, ça sera compliqué de faire simplement à l’aide des sentiments amoureux. Sans vision commune, difficile pour eux d’envisager un avenir commun.",
    "Scorpion&Poisson": "85% Scorpion & Poisson : Le Scorpion et le Poisson ont tous les deux une grande sensibilité. 2 écorchés vifs qui trouveront en chacun d’eux une raison de vivre. Attention à l’autodestruction, il faut que ces 2 là se soignent mutuellement leurs plaies et non qu’ils répandent du sel dessus.",
    "Sagittaire&Bélier": "80% Sagittaire & Bélier : Le Sagittaire et le Bélier se parlent franchement et sans détours ! Et ça marche ! Ils ne tergiversent pas et n’ont pas peur de se dire les choses en face. Pareil pour les sentiments, ils se livrent facilement l’un à l’autre, ce qui leur permet de construire une relation riche et intense.",
    "Sagittaire&Taureau": "30% Sagittaire & Taureau : Difficile d’aller dans la même direction pour ces 2 là. Il faut dire qu’ils ont une vision très différente de l’aventure. Si chacun décrit ses vacances de rêve, vous serez surpris de la différence de résultat. Mais l’essentiel c’est d’être ensemble. S’ils s’aiment, alors il n’y aura pas de problème !",
    "Sagittaire&Gémeaux": "75% Sagittaire & Gémeaux : Un couple qui partage la même vision de la liberté. Ils aiment être ensemble, mais ils aiment aussi cultiver leur jardin secret. Avec eux, pas de routine, la vie doit être une aventure.",
    "Sagittaire&Cancer": "15% Sagittaire & Cancer : Le Sagittaire et le Cancer ont tous les 2 besoin de beaucoup d’attention, parfois trop. Ils sont tous les 2 demandeurs et manquent parfois de générosité. Il faudra donc qu’ils fassent plus d’efforts de ce côté-là pour que ça marche, qu’ils prennent soin l’un de l’autre.",
    "Sagittaire&Lion": "75% Sagittaire & Lion : Le Sagittaire et le Lion s’entendent naturellement. Ils ont le même goût pour l’aventure et partagent souvent les mêmes aspirations. Ils s’admirent mutuellement et apprécient chacun les forces de l’autre. Une équipe très complémentaire.",
    "Sagittaire&Vierge": "10% Sagittaire & Vierge : Entre Sagittaire et Vierge, le ton peut très vite monter. La rigidité de l’un peut profondément agacer l’autre (on ne dira pas lequel est lequel, mais vous aurez deviné). Mais s’ils s’aiment et qu’ils font chacun les efforts pour se comprendre et faire preuve par moment de flexibilité, ça ira bien entre eux.",
    "Sagittaire&Balance": "85% Sagittaire & Balance : Le Sagittaire et la Balance sont 2 personnalités qui attirent autour d’eux les gens et les choses intéressantes. Ils ont chacun des univers riches et captivants, forcément ils apprécient donc de le partager l’un avec l’autre.",
    "Sagittaire&Scorpion": "20% Sagittaire & Scorpion : Entre le Sagittaire et le Scorpion beaucoup de méfiance. Si le Sagittaire joue carte sur table, le Scorpion lui a plus de mal à se dévoiler. Pour que ça marche, il faudra qu’ils se fassent plus confiance.",
    "Sagittaire&Sagittaire": "80% Sagittaire & Sagittaire : 2 Sagittaires ensemble, c’est une combinaison faite pour l’aventure. Ils formeront ensemble un couple solide et qui n’a pas froid aux yeux.",
    "Sagittaire&Capricorne": "40% Sagittaire & Capricorne : Entre le Sagittaire et le Capricorne, ça dépend des jours. Un couple formé par ces 2 signes sera loin d’être linéaire mais au moins il y aura de la vie au sein de leur foyer. Avec le temps ils développeront une bonne complicité et une forte complémentarité.",
    "Sagittaire&Verseau": "100% Sagittaire & Verseau : Qui mieux que le Verseau pour aller avec le Sagittaire. Ce couple est fait pour s’entendre. Ils débattent et confrontent leur idée avec passion et intérêt. Ils ne s’ennuient jamais quand ils sont ensemble. Ils s’aiment et n’ont besoin de personne d’autre pour se sentir bien.",
    "Sagittaire&Poisson": "35% Sagittaire & Poisson : Le Sagittaire et le Poisson ont tendance à mal se comprendre. Comme-ci ils émettaient tous les deux sur une fréquence différente. Pour que ça marche entre eux, il faudra que chacun apprenne et comprenne comment fonctionne l’autre.",
    "Capricorne&Bélier": "65% Capricorne & Bélier : Entre le Capricorne et le Bélier, il y a parfois de la friction. Ils ont tous les 2 la tête dure, du coup difficile parfois de trouver un compromis lorsque quelque chose les oppose. Difficile, mais pas impossible. À eux d’apprendre à composer avec l’autre.",
    "Capricorne&Taureau": "65% Capricorne & Taureau : D’une mentalité assez différente par nature, le Capricorne et le Taureau composent pourtant facilement l’un avec l’autre. C’est notamment au contact du Taureau, que le Capricorne arrive à lâcher prise pour mieux apprécier les petits plaisirs de la vie.",
    "Capricorne&Gémeaux": "50% Capricorne & Gémeaux : Le Capricorne et le Gémeaux aiment tous les 2 confronter leurs idées, même si leur style oratoire est très différent l’un de l’autre. S’ils partagent les mêmes idéologies et valeurs, ça ira. Sinon, le débat risque d’être un peu plus houleux.",
    "Capricorne&Cancer": "70% Capricorne & Cancer : Le Capricorne et le Cancer prennent soin l’un de l’autre en apportant à la relation ce que l’autre a besoin. Ils sont complémentaires et fonctionnent très bien en binôme, même si l’un d’entre eux peut d’avérer plus dépendant de l’autre.",
    "Capricorne&Lion": "60% Capricorne & Lion : Entre Capricorne et Lion, il est parfois compliqué de construire une vraie relation. Les affinités sont là, ils s’entendent bien, mais parfois quelque chose bloque. Il faudra donc réussir à surmonter ces petits obstacles pour réussir à construire une relation dans le temps.",
    "Capricorne&Vierge": "100% Capricorne & Vierge : Le Capricorne et la Vierge sont faits pour être ensemble. Ils ont les mêmes modèles de pensées et les mêmes façons de fonctionner. Ils s’apporteront à chacun le soutien et le réconfort dont ils ont besoin pour réaliser les grandes choses de leur vie.",
    "Capricorne&Balance": "20% Capricorne & Balance : Le Capricorne et la Balance peuvent avoir du mal à se supporter. Ils peuvent même s’énerver l’un et l’autre. Et pourtant, l’amour peut les conduire à former un couple fort et unis (même s’il peut y avoir quelques disputes).",
    "Capricorne&Scorpion": "80% Capricorne & Scorpion : Le Capricorne et le Scorpion fonctionnent sur le même rythme en amour. Ils se dévoilent lentement mais surement, jusqu’à atteindre une complicité unique. Mais attention à la jalousie dans ce couple qui peut agir comme un véritable poison.",
    "Capricorne&Sagittaire": "40% Capricorne & Sagittaire : Capricorne et Sagittaire ont parfois du mal à se supporter. 2 caractères forts qui répondent à leur propre schéma d’autorité. On reconnaîtra leur amour dans les moments les plus compliqués où ils arrivent à mettre leur égo de côté pour s’entraider.",
    "Capricorne&Capricorne": "85% Capricorne & Capricorne : 2 Capricorne ensemble, ce n’est pas le couple le plus expansif. Pourtant dans l’intimité, c’est le feu sous la glace. Dès lors qu’ils se libèrent dans l’intimité, ils construiront ensemble un couple plein d’amour.",
    "Capricorne&Verseau": "15% Capricorne & Verseau : Le Capricorne et le Verseau ont chacun un fort caractère. Le problème, c’est qu’ils ont du mal à accepter leur tords. Ils sont tous les 2 connus pour leur mauvaise foi. Mais s’ils apprennent à se connaître, ils finiront vite par s’apprécier.",
    "Capricorne&Poisson": "75% Capricorne & Poisson : Entre le Capricorne et le Poisson, ça peut très bien se passer. Le Poisson favorisera l’ouverture émotionnelle du Capricorne tandis que le Capricorne sera là pour apporter plus de structure à la vie du Poisson.",
    "Verseau&Bélier": "100% Verseau & Bélier : Verseau et Bélier, vous êtes fait pour vous entendre. Vous partagez le même dynamisme et le même esprit fonceur. Vous êtes animé tous les 2 de ce grain de folie qui rend la vie pétillante. Attention, parfois les autres auront des difficultés à vous suivre !",
    "Verseau&Taureau": "15% Verseau & Taureau : Verseau et Taureau ne sont pas toujours sur le même rythme. Il peut donc parfois être compliqué de se comprendre pour ces deux-là. Mais tout est une question d’adaptabilité. Si chacun fait des efforts pour s’adapter au rythme de l’autre, ça devrait bien se passer.",
    "Verseau&Gémeaux": "80% Verseau & Gémeaux : Verseau et Gémeaux ne sont jamais à court de sujets de discussion. De vrais moulins à parole. Ils aiment tous les 2 le débat et trouvent en chacun le compagnon de débat idéal. Par contre, mieux vaut avoir les mêmes idées, car il peut être compliqué de composer avec les points de divergences.",
    "Verseau&Cancer": "20% Verseau & Cancer : Le Verseau et le Cancer n’ont pas vraiment la même conception des relations amoureuses. Ils auront des besoins différents. 2 rythmes de vie pas facile à accorder, mais pas impossible. Encore une fois, tout est une question d’équilibre.",
    "Verseau&Lion": "80% Verseau & Lion : Le Verseau et le Lion ont un caractère assez différent mais complémentaire. Ils possèdent tous les 2 une certaine fougue et sont animés par ce qui les passionne. D’ailleurs, s’ils partagent une passion commune, c’est un plus pour leur relation.",
    "Verseau&Vierge": "35% Verseau & Vierge : Pas évident de se mettre d’accord entre le Verseau et la Vierge. Ce sont 2 profils qui possèdent des valeurs fortes. Du coup ils peuvent être un peu rigides sur certaines de ces valeurs et manquer de flexibilité. Pour que ça marche, il faudra donc faire preuve de tolérance.",
    "Verseau&Balance": "80% Verseau & Balance : Verseau et Balance sont 2 personnalités qui aiment échanger. La Balance a plus un profil d’écoute alors que le Verseau a un profil d’orateur. Cette tendance facilite les échanges même si les rôles peuvent s’inverser. Quoi qu’il arrive, ils s’entendent bien. En couple, ils sont amis avant d’être amants.",
    "Verseau&Scorpion": "40% Verseau & Scorpion : Le Verseau et le Scorpion ont parfois du mal à se cerner mutuellement. Au début de la relation, il n’est pas impossible qu’il y ait beaucoup de malentendu et de tensions. Il faut donc qu’ils apprennent à se connaître avant de pouvoir pleinement s’apprécier.",
    "Verseau&Sagittaire": "100% Verseau & Sagittaire : Le Verseau et Sagittaire partagent le même esprit d’aventure. Ils aiment la nouveauté et détestent l’ennuie. Ils sont donc l’un pour l’autre le parfait compagnon d’aventure. Un couple qui aime le voyage et les nouvelles expériences.",
    "Verseau&Capricorne": "10% Verseau & Capricorne : Entre le Verseau et le Capricorne ce n’est pas tous les jours facile. Ils ont du mal à s’écouter mutuellement. Chacun n’en fait qu’à sa tête et s’amuse même à être en opposition avec l’autre sur tous les sujets. Mais du coup, ça peut aussi leur permettre de créer une véritable complicité. En tout cas, ils ne s’ennuieront pas !",
    "Verseau&Verseau": "75% Verseau & Verseau : Un couple composé de 2 personnes sous le signe du Verseau est un couple qui dégage beaucoup de confiance. S’ils s’apprécient et partagent les mêmes valeurs, ils peuvent mener ensemble des combats, des luttes sociales et venir en aide aux autres ! Plus ils partageront les mêmes valeurs, plus leur amour sera fort.",
    "Verseau&Poisson": "50% Verseau & Poisson : Le Verseau et le Poisson ont une sensibilité assez développée. Ça leur permet de bien se comprendre, mais ça complique aussi les choses lorsque des tensions existent. Ils manquent parfois un peu de maturité pour mettre de côté leurs petites différences et pour se concentrer sur leurs points communs.",
    "Poisson&Balance": "40% Poisson & Balance : La Balance et le Poisson s’entendent bien, mais pas forcément en amour. Leurs besoins émotionnels sont généralement très différents. Mais s’ils font l’effort de s’adapter en fonction de l’autre, ça marchera.",
    "Poisson&Taureau": "90% Poisson & Taureau : Le couple Taureau et Poisson est un couple solide. Ils ont chacun un tempérament qui convient à l’autre. Leur relation prendra du temps à se construire mais une fois construite, celle-ci sera très solide. Attention cependant de ne pas s’enliser dans la routine.",
    "Poisson&Gémeaux": "30% Poisson & Gémeaux : Le Poisson et le Gémeaux ont des façons de fonctionner assez différentes l’une de l’autre. On a d’un côté l’abstrait et l’imaginaire et de l’autre le concret et le réel. À eux d’ouvrir leurs esprits et s’ouvrir l’un à l’autre pour mieux se comprendre.",
    "Poisson&Cancer": "100% Poisson & Cancer : Quand les grands esprits créatifs se rencontrent, ça peut faire des étincelles. Beaucoup d’émotions et de sentiments entre ces 2 signes du zodiaque. Cependant, il peut y avoir une trop grande sensibilité entre ces 2 là. Les disputes peuvent faire très mal à ce couple.",
    "Poisson&Lion": "15% Poisson & Lion : Le Poisson et le Lion ont des visions très différentes. D’ailleurs ils partagent rarement les mêmes centres d’intérêt et les mêmes motivations dans la vie. Mais ça ne les empêchera pas, en cas d’attirance mutuelle, de tomber amoureux l’un de l’autre.",
    "Poisson&Vierge": "85% Poisson & Vierge : Le Poisson et la Vierge sont 2 signes qui se complètent bien. La Vierge amènera dans la vie du Poisson le côté organisationnel qui lui manque. Le Poisson amènera lui la fantaisie qu’il manque parfois un peu dans la vie de la Vierge.",
    "Poisson&Scorpion": "85% Poisson & Scorpion : Le Scorpion et le Poisson sont 2 signes d’une grande sensibilité. Des amoureux passionnés qui aiment les histoires d’amour passionnelles. Attention cependant à ne pas faire preuve de trop de passion, sinon leur histoire risque de virer au drama.",
    "Poisson&Sagittaire": "35% Poisson & Sagittaire : Le Sagittaire et le Poisson ne se comprennent pas très bien. Ils ont une approche trop différente de la vie. Pourtant, ils partagent le même esprit d’aventure. Pour que ça marche, ils doivent donc réussir à trouver la quête commune qui feront de leur vie une aventure.",
    "Poisson&Capricorne": "75% Poisson & Capricorne : Entre le Capricorne et le Poisson, ça se passe généralement bien. Le Poisson aide le Capricorne à plus se livrer sur ce qu’il ressent. Le Capricorne apporte lui plus de stabilité et de rationalité dans la vie du Poisson. Ensemble, ils pourront construire une relation amoureuse épanouie.",
    "Poisson&Verseau": "50% Poisson & Verseau : Le Verseau et le Poisson sont très sensibles. Mais ce qui les différencie, c’est leur réaction face aux émotions négatives. Alors que le Verseau peut utiliser la négativité pour en faire une force et un moteur, le Poisson supportera mal le chaos et sera même attiré par la force du vide. Pour que ça marche, il faudra qu’ils fassent preuve d’indulgence et de bienveillance l’un envers l’autre.",
    "Poisson&Poisson": "80% Poisson & Poisson : Entre 2 Poissons, le courant passe généralement plutôt bien. Encore faut-il que ces 2 poissons suivent le courant dans le même sens. Ils ont tous les 2, une grande sensibilité et un esprit créatif très développé. Leur relation sera généralement intense, bien que parfois mouvementée.",
  };

  useEffect(() => {
    api.getCustomersBasicInfos().then(infos => {
        const astrologicalSignMap: { [key: string]: string } = {
          'Aries': 'Bélier',
          'Taurus': 'Taureau',
          'Gemini': 'Gémeaux',
          'Cancer': 'Cancer',
          'Leo': 'Lion',
          'Virgo': 'Vierge',
          'Libra': 'Balance',
          'Scorpio': 'Scorpion',
          'Sagittarius': 'Sagittaire',
          'Capricorn': 'Capricorne',
          'Aquarius': 'Verseau',
          'Pisces': 'Poissons'
        };
        
        infos = infos.map((row: { astrological_sign: string; }) => ({
          ...row,
          astrological_sign: astrologicalSignMap[row.astrological_sign]
        }));
        setCustomersInfo(infos);
      }).catch(error => {
        console.error('Failed to fetch customer count:', error);
      });
  }, []);

  const handleCompatibilityCheck = () => {
    if (selectedCustomer1 === null || selectedCustomer2 === null) {
      return;
    }

    const customer1 = customersInfo.find(customer => customer.id === selectedCustomer1);
    const customer2 = customersInfo.find(customer => customer.id === selectedCustomer2);

    if (!customer1 || !customer2) {
      return;
    }

    const key = `${customer1.astrological_sign}&${customer2.astrological_sign}`;
    const reversedKey = `${customer2.astrological_sign}&${customer1.astrological_sign}`;
    const compatibilityResult = compatibilityData[key] || compatibilityData[reversedKey] || "Aucune compatibilité définie pour cette combinaison.";

    setResult(compatibilityResult);
  };

  const navigate = useNavigate();

  return (
    <div className="customer-selection">
      <header className="navbar">
        <div className="navbar-logo">Soul Connection</div>
        <nav className="navbar-links">
          <button className="navbar-link" onClick={() => {navigate("/dashboard"); window.location.reload()}}>Dashboard</button>
          <button className="navbar-link" onClick={() => {navigate("/coaches"); window.location.reload()}}>Coaches</button>
          <button className="navbar-link" onClick={() => {navigate("/customers"); window.location.reload()}}>Customers</button>
          <button className="navbar-link" onClick={() => {navigate("/tips"); window.location.reload()}}>Tips</button>
          <button className="navbar-link" onClick={() => {navigate("/events"); window.location.reload()}}>Events</button>
          <button className="navbar-link" onClick={() => {navigate("/clothes"); window.location.reload()}}>Clothes</button>
          <button className="navbar-link active" onClick={() => {navigate("/compatibility"); window.location.reload()}}>Compatibility</button>
        </nav>
        <div className="navbar-actions">
          <button className="navbar-icon">🔔</button>
          <button className="navbar-icon">🇺🇸</button>
          <button className="navbar-icon" onClick={() => {api.disconnectEmployee(); window.location.reload()}}>👤</button>
        </div>
      </header>
      <div className="astro-test">
        <div className="astro-test2">

          <h1>Test de Compatibilité</h1>
          <div className="customer-selection">
            <label className="labelastrotest" htmlFor="customer1">Choisissez le premier client :</label>
            <select
              id="customer1"
              onChange={(e) => setSelectedCustomer1(Number(e.target.value))}
              value={selectedCustomer1 ?? ''}
            >
              <option value="">Sélectionnez le premier client</option>
              {customersInfo.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.firstname} {customer.lastname} ({customer.astrological_sign})
                </option>
              ))}
            </select>

            <label htmlFor="customer2">Choisissez le deuxième client :</label>
            <select
              id="customer2"
              onChange={(e) => setSelectedCustomer2(Number(e.target.value))}
              value={selectedCustomer2 ?? ''}
            >
              <option value="">Sélectionnez le deuxième client</option>
              {customersInfo.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.firstname} {customer.lastname} ({customer.astrological_sign})
                </option>
              ))}
            </select>

            <button onClick={handleCompatibilityCheck} disabled={selectedCustomer1 === null || selectedCustomer2 === null}>
              Tester la compatibilité
            </button>
          </div>

          {result && (
            <div className="result">
              <h2>{result}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AstroTest;