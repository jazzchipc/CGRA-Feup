//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

//Criando um ficheiro .js é necessário adicioná-lo aqui
serialInclude(['../lib/CGF.js', 'MyObject.js','TPscene.js', 

main=function()
{
    //classe que encapsula uma aplicação webgl
    var app = new CGFapplication(document.body);
    //a classe necessita de um objeto cena...
    var myScene = new TPscene();
    //e de uma interface
    var myInterface = new CGFinterface();

    //initicializar buffers, cena e interface
    app.init();

    //associamos a cena e interface à aplicaçao
    //cena -> grafo que descreve a hierarquia de objetos necessarios à visualização
    app.setScene(myScene);
    app.setInterface(myInterface);

    myInterface.setActiveCamera(myScene.camera);

    //ciclo infinito que faz a visualização da imagem
    app.run();
 
    //Existem dois buffers, num em que é feita a edição e outro que faz a visualização no ecra. Existe o swap entre estes buffers.
}

]);