//import '../old_styles/Mensaje.css';

function MensajeConfirmacion({titulo, tipo}) {
    console.log(titulo);
    return (
        tipo === 'exito' ? (
            <div className='cartel-mensaje'>
                <div className='contenedor-check-mensaje'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 60 60">
                        <path className="cls-1" d="M800,510a30,30,0,1,1,30-30A30,30,0,0,1,800,510Zm-16.986-23.235a3.484,3.484,0,0,1,0-4.9l1.766-1.756a3.185,3.185,0,0,1,4.574.051l3.12,3.237a1.592,1.592,0,0,0,2.311,0l15.9-16.39a3.187,3.187,0,0,1,4.6-.027L817,468.714a3.482,3.482,0,0,1,0,4.846l-21.109,21.451a3.185,3.185,0,0,1-4.552.03Z" id="check" transform="translate(-770 -450)" />
                    </svg>
                    <label className='green-text'><b>{titulo}</b></label>
                </div>
            </div>
        ) : (
            <div className='cartel-error-mensaje'>
                <div className='contenedor-mensaje'>
                    <svg
                    xmlns:osb="http://www.openswatchbook.org/uri/2009/osb"
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlns:svg="http://www.w3.org/2000/svg"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                    viewBox="0 0 48 48"
                    width="20px" 
                    height="20px"
                    version="1.1"
                    id="svg15"
                    sodipodi:docname="cross red circle.svg"
                    inkscape:version="0.92.3 (2405546, 2018-03-11)">
                    
                    <metadata id="metadata19">
                        <rdf:RDF>
                            <cc:Work rdf:about="">
                                <dc:format>image/svg+xml</dc:format>
                                <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                                <dc:title />
                            </cc:Work>
                        </rdf:RDF>
                    </metadata>

                    <sodipodi:namedview
                        pagecolor="#ffffff"
                        bordercolor="#666666"
                        borderopacity="1"
                        objecttolerance="10"
                        gridtolerance="10"
                        guidetolerance="10"
                        inkscape:pageopacity="0"
                        inkscape:pageshadow="2"
                        inkscape:window-width="1920"
                        inkscape:window-height="1027"
                        id="namedview17"
                        showgrid="false"
                        inkscape:zoom="4.9166667"
                        inkscape:cx="-11.694915"
                        inkscape:cy="40.271186"
                        inkscape:window-x="-8"
                        inkscape:window-y="-8"
                        inkscape:window-maximized="1"
                        inkscape:current-layer="g13" />

                    <defs id="defs7">
                        <linearGradient id="linearGradient828" osb:paint="solid">
                            <stop style={{ stopColor: '#ff0000', stopOpacity: 1 }} offset="0" id="stop826" />
                        </linearGradient>

                        <linearGradient id="0" gradientUnits="userSpaceOnUse" y1="47.37" x2="0" y2="-1.429">
                            <stop stopColor="#c52828" id="stop2" />
                            <stop offset="1" stopColor="#ff5454" id="stop4" />
                        </linearGradient>
                    </defs>

                    <g
                        transform="matrix(.99999 0 0 .99999-58.37.882)"
                        enableBackground="new"
                        id="g13"
                        style={{ fillOpacity: 1 }}>
                        
                        <circle
                            cx="82.37"
                            cy="23.12"
                            r="24"
                            fill="url(#0)"
                            id="circle9"
                            style={{ fillOpacity: 1, fill: 'rgb(249 29 29)' }} />
                        
                        <path
                            d="m87.77 23.725l5.939-5.939c.377-.372.566-.835.566-1.373 0-.54-.189-.997-.566-1.374l-2.747-2.747c-.377-.372-.835-.564-1.373-.564-.539 0-.997.186-1.374.564l-5.939 5.939-5.939-5.939c-.377-.372-.835-.564-1.374-.564-.539 0-.997.186-1.374.564l-2.748 2.747c-.377.378-.566.835-.566 1.374 0 .54.188.997.566 1.373l5.939 5.939-5.939 5.94c-.377.372-.566.835-.566 1.373 0 .54.188.997.566 1.373l2.748 2.747c.377.378.835.564 1.374.564.539 0 .997-.186 1.374-.564l5.939-5.939 5.94 5.939c.377.378.835.564 1.374.564.539 0 .997-.186 1.373-.564l2.747-2.747c.377-.372.566-.835.566-1.373 0-.54-.188-.997-.566-1.373l-5.939-5.94"
                            fill="#fff"
                            fillOpacity=".842"
                            id="path11"
                            style={{ fillOpacity: 1, fill: '#ffffff' }} />
                    </g>
                    </svg>

                    <label className='red-text'><b>{titulo}</b></label>
                </div>
            </div>
        ) // Si tipo no es 'exito', no renderiza nada
    );
}

export default MensajeConfirmacion;
