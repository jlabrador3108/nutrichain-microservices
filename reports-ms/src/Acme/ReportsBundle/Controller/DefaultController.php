<?php

namespace Acme\ReportsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('AcmeReportsBundle:Default:index.html.twig');
    }
}
